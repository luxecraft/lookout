// deno-lint-ignore-file no-explicit-any
import { Client } from "https://esm.sh/typesense@1.4.4";
import {
    TYPESENSE_INDEX_NAME,
    TYPESENSE_API_KEY,
    TYPESENSE_URL,
} from "./config.ts";

export const typesense = new Client({
    nodes: [
        {
            host: TYPESENSE_URL,
            port: 443,
            protocol: "https",
        },
    ],
    apiKey: TYPESENSE_API_KEY,
});

export async function writeToTypesense(data: any) {
    const res = await fetch(
        `https://${TYPESENSE_URL}:443/collections/${TYPESENSE_INDEX_NAME}/documents?action=upsert`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-TYPESENSE-API-KEY": TYPESENSE_API_KEY,
            },
            body: JSON.stringify(data),
        }
    );
    return res.json();
}
