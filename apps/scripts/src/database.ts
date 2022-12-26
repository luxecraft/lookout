import {
    BATCH_SIZE,
    MICRO_BATCH_SIZE,
    PARSED_BASE_PATH,
    TABLE_NAME,
} from "./config";
import { supabase } from "./supabase";
import { parseVisionJSON } from "./typesense";
import fs from "fs";
import retry from "async-retry";

export async function writeToDB(i: number) {
    for (let j = 0; j < BATCH_SIZE / MICRO_BATCH_SIZE; j++) {
        parseVisionJSON(i, j);
        const parsed = JSON.parse(
            fs
                .readFileSync(
                    `${PARSED_BASE_PATH}/parsed_${i}/parsed_${i}${j}.json`
                )
                .toString()
        );
        const { error } = await retry(
            () => supabase.from(TABLE_NAME).upsert(parsed),
            {
                retries: 5,
            }
        );
        if (error) {
            console.log(error);
        }
        console.log(`Written to DB parsed_${i}/parsed_${i}${j}.json`);
    }
}
