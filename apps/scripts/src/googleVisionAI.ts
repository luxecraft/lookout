import { ImageAnnotatorClient, protos } from "@google-cloud/vision";
import {
    BATCH_ANNOTATE_IMAGES,
    BATCH_SIZE,
    IMAGES_BASE_PATH,
    IMAGES_VISION_BASE_PATH,
    MICRO_BATCH_SIZE,
    TOTAL,
} from "./config";
import fs from "fs";
import retry from "async-retry";

const client = new ImageAnnotatorClient();
type Request = protos.google.cloud.vision.v1.IBatchAnnotateImagesRequest;

export async function parseBatchImage(i: number, j: number) {
    const requests = [];

    for (let k = 0; k < MICRO_BATCH_SIZE; k++) {
        const filePath = `${IMAGES_BASE_PATH}/images_${i}/images_${i}${j}/images_${i}${j}${k}.jpeg`;
        requests.push({
            request: {
                image: {
                    content: fs.readFileSync(filePath),
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
                ],
            },
            number: k,
        });
    }
    while (requests.length) {
        const reqs = requests.splice(0, BATCH_ANNOTATE_IMAGES);
        const batchRequest: Request = {
            requests: reqs.map((r) => r.request),
        };
        const [batchResponse] = await retry(
            () => client.batchAnnotateImages(batchRequest),
            {
                retries: 5,
            }
        );
        const responses = batchResponse.responses;
        for (let k = 0; k < responses.length; k++) {
            if (responses[k].error) {
                console.log(responses[k].error);
                return;
            }
            fs.writeFileSync(
                `${IMAGES_VISION_BASE_PATH}/vision_${i}/vision_${i}${j}/vision_${i}${j}${reqs[k].number}.json`,
                JSON.stringify(responses[k], null, 2)
            );
            console.log(`Written vision_${i}${j}${reqs[k].number}.json`);
        }
    }
}

export async function parseAllImages(i: number, j: number) {
    await parseBatchImage(i, j);
}
