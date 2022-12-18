import fs from "fs";
import {
    BATCH_SIZE,
    IMAGES_VISION_BASE_PATH,
    IMAGE_SHA1_BASE_PATH,
    MICRO_BATCH_SIZE,
    PARSED_BASE_PATH,
    TYPESENSE_API_KEY,
    TYPESENSE_URL,
} from "./config";
import { Client } from "typesense";
import { CollectionCreateSchema } from "typesense/lib/Typesense/Collections";

const typesense = new Client({
    nodes: [
        {
            host: TYPESENSE_URL,
            port: 443,
            protocol: "https",
        },
    ],
    apiKey: TYPESENSE_API_KEY,
});

export function parseVisionJSON(i: number, j: number) {
    const sha = JSON.parse(
        fs
            .readFileSync(
                `${IMAGE_SHA1_BASE_PATH}/image_sha1_${i}/image_sha1_${i}${j}.json`
            )
            .toString()
    );
    const parsedDatas = [];
    for (let k = 0; k < MICRO_BATCH_SIZE; k++) {
        const data = JSON.parse(
            fs
                .readFileSync(
                    `${IMAGES_VISION_BASE_PATH}/vision_${i}/vision_${i}${j}/vision_${i}${j}${k}.json`
                )
                .toString()
        );
        const safeSearch = [];
        for (let [l, v] of Object.entries(data.safeSearchAnnotation)) {
            if (v !== "VERY_UNLIKELY" && v !== "UNLIKELY" && v !== "POSSIBLE") {
                safeSearch.push(l);
            }
        }
        let colors = data.imagePropertiesAnnotation.dominantColors.colors.map(
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
        );
        colors = colors.filter((color: any) => color !== undefined);
        const parsedData = {
            id: `${i}${j}${k}`,
            sub: `/${sha[k].prefix}/${sha[k].sha1.slice(0, 2)}/${sha[
                k
            ].sha1.slice(2, 4)}/${sha[k].sha1}`,
            width: sha[k].width,
            height: sha[k].height,
            source: sha[k].metadata.source ?? "",
            nfsw: sha[k].metadata.nfsw ?? false,
            labels: data.labelAnnotations.map(
                (label: any) => label.description
            ),
            text: data.textAnnotations.map((text: any) => text.description),
            safeSearch,
            post_url: sha[k].metadata.post_url ?? "",
            title: sha[k].metadata.title ?? "",
            colors,
            image_url: `/images/images_${i}/images_${i}${j}/images_${i}${j}${k}.jpeg`,
        };
        parsedDatas.push(parsedData);
    }
    fs.writeFileSync(
        `${PARSED_BASE_PATH}/parsed_${i}/parsed_${i}${j}.json`,
        JSON.stringify(parsedDatas, null, 2)
    );
    console.log(`Written parsed_${i}/parsed_${i}${j}.json`);
}

export async function indexParsedIntoTypesense(i: number) {
    await createCollection();
    for (let j = 0; j < BATCH_SIZE / MICRO_BATCH_SIZE; j++) {
        parseVisionJSON(i, j);
        const parsed = JSON.parse(
            fs
                .readFileSync(
                    `${PARSED_BASE_PATH}/parsed_${i}/parsed_${i}${j}.json`
                )
                .toString()
        );
        await typesense.collections("images").documents().import(parsed, {
            action: "upsert",
        });
        console.log(`Indexed parsed_${i}/parsed_${i}${j}.json`);
    }
}

export async function createCollection() {
    const schema: CollectionCreateSchema = {
        name: "images",
        fields: [
            {
                name: "id",
                type: "string",
                optional: false,
            },
            {
                name: "sub",
                type: "string",
                optional: false,
            },
            {
                name: "width",
                type: "int32",
                optional: false,
            },
            {
                name: "height",
                type: "int32",
                optional: false,
            },
            {
                name: "source",
                type: "string",
                optional: false,
            },
            {
                name: "nfsw",
                type: "bool",
                optional: false,
            },
            {
                name: "labels",
                type: "string[]",
                optional: false,
            },
            {
                name: "text",
                type: "string[]",
                optional: false,
            },
            {
                name: "safeSearch",
                type: "string[]",
                optional: false,
            },
            {
                name: "post_url",
                type: "string",
                optional: false,
            },
            {
                name: "title",
                type: "string",
                optional: false,
            },
            {
                name: "colors",
                type: "string[]",
                optional: false,
            },
            {
                name: "image_url",
                type: "string",
                optional: false,
            },
        ],
        token_separators: ["\n", "-", "_", " "],
    };
    try {
        await typesense.collections("images").retrieve();
        console.log("Collection images already exists");
        // await typesense.collections("images").delete();
        // await typesense.collections().create(schema);
    } catch (err) {
        if (err.httpStatus === 404) {
            await typesense.collections().create(schema);
            console.log("Collection images created");
        }
    }
}
