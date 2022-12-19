import {
    BASE_BLOB_URL,
    IMAGES_BASE_PATH,
    IMAGE_SHA1_BASE_PATH,
} from "./config";
import fs from "fs";
import { downloadImage } from "./downloadImage";
import { limiter } from "./bottleneck";

export async function downloadImagesFromSHA1(i: number, j: number) {
    const imageUrls = JSON.parse(
        fs.readFileSync(
            `${IMAGE_SHA1_BASE_PATH}/image_sha1_${i}/image_sha1_${i}${j}.json`,
            "utf-8"
        )
    );
    for (let k = 800; k < imageUrls.length; k++) {
        const url = `${BASE_BLOB_URL}/${imageUrls[k].prefix}/${imageUrls[
            k
        ].sha1.slice(0, 2)}/${imageUrls[k].sha1.slice(2, 4)}/${
            imageUrls[k].sha1
        }`;
        const filepath = `${IMAGES_BASE_PATH}/images_${i}/images_${i}${j}/images_${i}${j}${k}.jpeg`;
        limiter.schedule(() => downloadImage(url, filepath));
    }
}
