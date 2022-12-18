import { BATCH_SIZE, MICRO_BATCH_SIZE, TOTAL } from "./config";
import fs from "fs";

export function generateShFile() {
    let sh = `#!/bin/bash\n\n`;
    sh += `nohup npx ts-node src/run.ts --type init &\nwait\n\n`;
    for (let i = 0; i < TOTAL / BATCH_SIZE; i++) {
        sh += `nohup npx ts-node src/run.ts --type getImageSHA1 --i ${i} &\n`;
    }
    sh += `wait\n\n`;

    for (let i = 0; i < TOTAL / BATCH_SIZE; i++) {
        sh += `nohup npx ts-node src/run.ts --type uploadSHA1ToSupabase --i ${i} &\n`;
    }
    sh += `wait\n\n`;

    for (let i = 0; i < TOTAL / BATCH_SIZE; i++) {
        for (let j = 0; j < BATCH_SIZE / MICRO_BATCH_SIZE; j++) {
            sh += `nohup npx ts-node src/run.ts --type downloadImagesFromSHA1 --i ${i} --j ${j} &\n`;
        }
        sh += `wait\n\n`;
    }
    sh += `wait\n\n`;

    for (let i = 0; i < TOTAL / BATCH_SIZE; i++) {
        for (let j = 0; j < BATCH_SIZE / MICRO_BATCH_SIZE; j++) {
            sh += `nohup npx ts-node src/run.ts --type uploadImagesToSupabase --i ${i} --j ${j} &\n`;
        }
        sh += `wait\n\n`;
    }
    sh += `wait\n\n`;

    for (let i = 0; i < TOTAL / BATCH_SIZE; i++) {
        for (let j = 0; j < BATCH_SIZE / MICRO_BATCH_SIZE; j++) {
            sh += `nohup npx ts-node src/run.ts --type parseAllImages --i ${i} --j ${j} &\n`;
        }
        sh += `wait\n`;
    }
    sh += `wait\n\n`;

    for (let i = 0; i < TOTAL / BATCH_SIZE; i++) {
        for (let j = 0; j < BATCH_SIZE / MICRO_BATCH_SIZE; j++) {
            sh += `nohup npx ts-node src/run.ts --type uploadVisionResponseToSupabase --i ${i} --j ${j} &\n`;
        }
        sh += `wait\n`;
    }
    sh += `wait\n\n`;

    for (let i = 0; i < TOTAL / BATCH_SIZE; i++) {
        sh += `nohup npx ts-node src/run.ts --type indexIntoTypesense --i ${i} &\n`;
    }
    sh += `wait\n\n`;

    for (let i = 0; i < TOTAL / BATCH_SIZE; i++) {
        sh += `nohup npx ts-node src/run.ts --type writeToDB --i ${i} &\n`;
    }
    sh += `wait\n\n`;

    fs.writeFileSync("./leftover.sh", sh);
}
