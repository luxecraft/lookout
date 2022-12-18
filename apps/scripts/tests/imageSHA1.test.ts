import {
    BATCH_SIZE,
    IMAGE_SHA1_BASE_PATH,
    MICRO_BATCH_SIZE,
    TOTAL,
} from "../src/config";
import fs from "fs";

test("check if there is image_sha1 dir", () => {
    expect(fs.existsSync(IMAGE_SHA1_BASE_PATH)).toBeTruthy();
});
test("check if images_i dir", () => {
    for (let i = 0; i < TOTAL / BATCH_SIZE; i++) {
        expect(
            fs.existsSync(`${IMAGE_SHA1_BASE_PATH}/image_sha1_${i}`)
        ).toBeTruthy();
    }
});

test("check if images_i/images_ij.json file", () => {
    for (let i = 0; i < TOTAL / BATCH_SIZE; i++) {
        for (let j = 0; j < BATCH_SIZE / MICRO_BATCH_SIZE; j++) {
            expect(
                fs.existsSync(
                    `${IMAGE_SHA1_BASE_PATH}/image_sha1_${i}/image_sha1_${i}${j}.json`
                )
            ).toBeTruthy();
        }
    }
});

test(`check if images_i/images_ij/images_ij.json file has ${MICRO_BATCH_SIZE} SHA1s`, () => {
    for (let i = 0; i < TOTAL / BATCH_SIZE; i++) {
        for (let j = 0; j < BATCH_SIZE / MICRO_BATCH_SIZE; j++) {
            for (let k = 0; k < MICRO_BATCH_SIZE; ++k) {
                const jsonFile = JSON.parse(
                    fs.readFileSync(
                        `${IMAGE_SHA1_BASE_PATH}/image_sha1_${i}/image_sha1_${i}${j}.json`,
                        "utf-8"
                    )
                );
                expect(jsonFile.length).toBe(MICRO_BATCH_SIZE);
            }
        }
    }
});
