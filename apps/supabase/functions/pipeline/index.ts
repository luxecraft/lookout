// deno-lint-ignore-file no-explicit-any
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { TABLE_NAME, BLOB_URL } from "../config.ts";
import {
    Vision,
    GoogleAuth,
    AnnotateImageRequest,
} from "https://googleapis.deno.dev/v1/vision:v1.ts";
import type { Feature } from "https://googleapis.deno.dev/v1/vision:v1.ts";
import { supabase } from "../supabase.ts";
import { writeToTypesense } from "../typesense.ts";
import retry from "https://esm.sh/async-retry@1.3.3";
import { _noResolveJsonResponse } from "https://esm.sh/v99/@supabase/gotrue-js@2.6.0/dist/module/lib/fetch.d.ts";

const googleAuth = new GoogleAuth();

serve(async (req: any) => {
    const data = await req.json();
    console.log(data);

    if (data.type === "INSERT" && data.table === TABLE_NAME) {
        const creds = await retries(fetch(`${BLOB_URL}/credentials.json`));
        const auth = googleAuth.fromJSON(await creds.json());

        const client = new Vision(auth);
        const full_url = `${BLOB_URL}${data.record.image_url}`;

        const request: AnnotateImageRequest = {
            image: {
                source: {
                    imageUri: full_url,
                },
            },
            features: [
                {
                    type: "LABEL_DETECTION",
                },
                {
                    type: "TEXT_DETECTION",
                },
                {
                    type: "IMAGE_PROPERTIES",
                },
                {
                    type: "SAFE_SEARCH_DETECTION",
                },
            ] as Feature[],
        };

        const response = await retry(
            async () => {
                const response = await client.imagesAnnotate({
                    requests: [request],
                });

                if (response?.responses?.[0].error) {
                    throw new Error(response?.responses?.[0].error.message);
                }
                return response;
            },
            {
                retries: 3,
            }
        );
        console.log(response);

        const parsedData = parseData(response?.responses?.[0]);
        console.log(parsedData);

        // Update the record with the parsed data
        const { error } = await retries(
            supabase.from(TABLE_NAME).upsert({
                ...data.record,
                ...parseData,
            })
        );

        if (error) {
            console.log(error);
        }

        const typesense_record = await retries(
            writeToTypesense({
                ...data.record,
                ...parsedData,
            })
        );
        console.log(typesense_record);

        return new Response(JSON.stringify(data), {
            headers: { "Content-Type": "application/json" },
        });
    }

    return new Response(
        JSON.stringify({
            message: "Not a valid request",
        })
    );
});

function parseData(data: any) {
    const safeSearch = [];
    for (const [l, v] of Object.entries(data.safeSearchAnnotation)) {
        if (v !== "VERY_UNLIKELY" && v !== "UNLIKELY" && v !== "POSSIBLE") {
            safeSearch.push(l);
        }
    }
    let colors =
        data.imagePropertiesAnnotation?.dominantColors.colors.map(
            (color: any) => {
                if (color.score > 0.1) {
                    return (
                        "rgb(" +
                        color.color.red +
                        "," +
                        color.color.green +
                        "," +
                        color.color.blue +
                        ")"
                    );
                }
            }
        ) ?? [];
    colors = colors.filter((color: any) => color !== undefined);
    const parsedData = {
        labels:
            data.labelAnnotations?.map((label: any) => label.description) ?? [],
        text: data.textAnnotations?.map((text: any) => text.description) ?? [],
        safe_search: safeSearch,
        colors,
    };

    return parsedData;
}

function retries(func: any) {
    return retry(() => func, {
        retries: 0,
    });
}
