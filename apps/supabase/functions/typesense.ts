// deno-lint-ignore-file no-explicit-any
import {
    TYPESENSE_INDEX_NAME,
    TYPESENSE_API_KEY,
    TYPESENSE_URL,
} from "./config.ts";

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
