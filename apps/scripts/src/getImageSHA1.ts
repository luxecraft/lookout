import fs from "fs";
import {
    BASE_IMAGE_SHA_URL,
    BATCH_SIZE,
    IMAGE_SHA1_BASE_PATH,
    MICRO_BATCH_SIZE,
    TOTAL,
} from "./config";
import { axios } from "./axios";
import { v4 } from "uuid";

export async function getImageSHA1(i: number) {
    let response = [];
    let j = 0;
    let count = 0;
    while (count < BATCH_SIZE) {
        try {
            const data = (
                await axios.post(BASE_IMAGE_SHA_URL, {
                    token: "",
                    user_id: `anonymous@@${v4().replace(/-/g, "")}`,
                })
            ).data;
            response.push(...data.payload.images);
            count += data.payload.images.length;
        } catch (e) {
            console.error(e);
            continue;
        }
        if (response.length === MICRO_BATCH_SIZE) {
            fs.writeFileSync(
                `${IMAGE_SHA1_BASE_PATH}/image_sha1_${i}/image_sha1_${i}${j}.json`,
                JSON.stringify(response, null, 2)
            );
            console.log(`Created image_sha1_${i}${j}.json`);
            j++;
            response = [];
        }
    }
}
