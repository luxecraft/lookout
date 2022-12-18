import {
    BATCH_SIZE,
    MICRO_BATCH_SIZE,
    PARSED_BASE_PATH,
    TOTAL,
} from "../src/config";
import fs from "fs";

test("check if there is parsed dir", () => {
    expect(fs.existsSync(PARSED_BASE_PATH)).toBeTruthy();
});
test("check if parsed_i dir", () => {
    for (let i = 0; i < TOTAL / BATCH_SIZE; i++) {
        expect(fs.existsSync(`${PARSED_BASE_PATH}/parsed_${i}`)).toBeTruthy();
    }
});

test("check if parsed_i/parsed_ij.json file", () => {
    for (let i = 0; i < TOTAL / BATCH_SIZE; i++) {
        for (let j = 0; j < BATCH_SIZE / MICRO_BATCH_SIZE; j++) {
            expect(
                fs.existsSync(
                    `${PARSED_BASE_PATH}/parsed_${i}/parsed_${i}${j}.json`
                )
            ).toBeTruthy();
        }
    }
});
