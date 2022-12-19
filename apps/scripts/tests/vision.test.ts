import {
    BATCH_SIZE,
    IMAGES_BASE_PATH,
    IMAGES_VISION_BASE_PATH,
    MICRO_BATCH_SIZE,
    TOTAL,
} from "../src/config";
import fs from "fs";

test("check if there is images dir", () => {
    expect(fs.existsSync(IMAGES_VISION_BASE_PATH)).toBeTruthy();
});
test("check if vision_i dir", () => {
    for (let i = 0; i < TOTAL / BATCH_SIZE; i++) {
        expect(
            fs.existsSync(`${IMAGES_VISION_BASE_PATH}/vision_${i}`)
        ).toBeTruthy();
    }
});

test("check if vision_i/vision_ij dir", () => {
    for (let i = 0; i < TOTAL / BATCH_SIZE; i++) {
        for (let j = 0; j < BATCH_SIZE / MICRO_BATCH_SIZE; j++) {
            expect(
                fs.existsSync(
                    `${IMAGES_VISION_BASE_PATH}/vision_${i}/vision_${i}${j}`
                )
            ).toBeTruthy();
        }
    }
});

test("check if vision_i/vision_ij/vision_ijk json file", () => {
    for (let i = 0; i < TOTAL / BATCH_SIZE; i++) {
        for (let j = 0; j < BATCH_SIZE / MICRO_BATCH_SIZE; j++) {
            for (let k = 0; k < MICRO_BATCH_SIZE; ++k) {
                expect(
                    fs.existsSync(
                        `${IMAGES_VISION_BASE_PATH}/vision_${i}/vision_${i}${j}/vision_${i}${j}${k}.json`
                    )
                ).toBeTruthy();
            }
        }
    }
});
