import { limiter } from "./bottleneck";
import {
    BATCH_SIZE,
    IMAGES_BASE_PATH,
    IMAGES_VISION_BASE_PATH,
    IMAGE_SHA1_BASE_PATH,
    MICRO_BATCH_SIZE,
    SUPABASE_BUCKET,
} from "./config";
import { supabase } from "./supabase";
import retry from "async-retry";
import fs from "fs";

export async function uploadImagesToSupabaseStorage(i: number, j: number) {
    for (let k = 0; k < MICRO_BATCH_SIZE; k++) {
        const filePath = `${IMAGES_BASE_PATH}/images_${i}/images_${i}${j}/images_${i}${j}${k}.jpeg`;
        const imageFile = fs.readFileSync(filePath);
        await retry(
            () =>
                supabase.storage
                    .from(SUPABASE_BUCKET)
                    .upload(
                        `images/images_${i}/images_${i}${j}/images_${i}${j}${k}.jpeg`,
                        imageFile,
                        {
                            upsert: true,
                        }
                    ),
            {
                retries: 5,
            }
        );
        console.log(`Uploaded images_${i}${j}${k}.jpeg`);
    }
}

export async function uploadImageSHA1ToSupabaseStorage(i: number) {
    for (let j = 0; j < BATCH_SIZE / MICRO_BATCH_SIZE; j++) {
        const filePath = `${IMAGE_SHA1_BASE_PATH}/image_sha1_${i}/image_sha1_${i}${j}.json`;
        const shaFile = fs.readFileSync(filePath);
        await retry(
            () =>
                supabase.storage
                    .from(SUPABASE_BUCKET)
                    .upload(
                        `image_sha1/image_sha1_${i}/image_sha1_${i}${j}.json`,
                        shaFile,
                        {
                            upsert: true,
                        }
                    ),
            {
                retries: 5,
            }
        );
        console.log(`Uploaded image_sha1_${i}${j}.json`);
    }
}

export async function uploadVisionResponseToSupabaseStorage(
    i: number,
    j: number
) {
    for (let k = 0; k < MICRO_BATCH_SIZE; k++) {
        const filePath = `${IMAGES_VISION_BASE_PATH}/vision_${i}/vision_${i}${j}/vision_${i}${j}${k}.json`;
        const visionFile = fs.readFileSync(filePath);
        await retry(
            () =>
                supabase.storage
                    .from(SUPABASE_BUCKET)
                    .upload(
                        `vision/vision_${i}/vision_${i}${j}/vision_${i}${j}${k}.json`,
                        visionFile,
                        {
                            upsert: true,
                        }
                    ),
            {
                retries: 5,
            }
        );
        console.log(`Uploaded vision_${i}${j}${k}.json`);
    }
}
