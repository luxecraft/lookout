import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import {
    BATCH_SIZE,
    DATA_BASE_PATH,
    IMAGES_BASE_PATH,
    IMAGES_VISION_BASE_PATH,
    IMAGE_SHA1_BASE_PATH,
    MICRO_BATCH_SIZE,
    PARSED_BASE_PATH,
    TOTAL,
} from "./config";
import { downloadImagesFromSHA1 } from "./downloadImagesFromSHA1";
import { getImageSHA1 } from "./getImageSHA1";
import {
    uploadImageSHA1ToSupabaseStorage,
    uploadImagesToSupabaseStorage,
    uploadVisionResponseToSupabaseStorage,
} from "./storage";
import fs from "fs";
import { generateShFile } from "./generateShFile";
import { parseAllImages } from "./googleVisionAI";
import { indexParsedIntoTypesense } from "./typesense";
import { writeToDB } from "./database";

function init() {
    if (!fs.existsSync(DATA_BASE_PATH)) {
        fs.mkdirSync(DATA_BASE_PATH);
        console.log("Created data directory");
    }
    if (!fs.existsSync(IMAGE_SHA1_BASE_PATH)) {
        fs.mkdirSync(IMAGE_SHA1_BASE_PATH);
        console.log("Created data/image_sha1 directory");
    }

    if (!fs.existsSync(IMAGES_BASE_PATH)) {
        fs.mkdirSync(IMAGES_BASE_PATH);
        console.log("Created data/images directory");
    }

    if (!fs.existsSync(IMAGES_VISION_BASE_PATH)) {
        fs.mkdirSync(IMAGES_VISION_BASE_PATH);
        console.log("Created data/vision directory");
    }

    if (!fs.existsSync(PARSED_BASE_PATH)) {
        fs.mkdirSync(PARSED_BASE_PATH);
        console.log("Created data/parsed directory");
    }

    for (let i = 0; i < TOTAL / BATCH_SIZE; i++) {
        if (!fs.existsSync(`${IMAGE_SHA1_BASE_PATH}/image_sha1_${i}`)) {
            fs.mkdirSync(`${IMAGE_SHA1_BASE_PATH}/image_sha1_${i}`);
            console.log(`Created image_sha1_${i} directory`);
        }
        if (!fs.existsSync(`${IMAGES_BASE_PATH}/images_${i}`)) {
            fs.mkdirSync(`${IMAGES_BASE_PATH}/images_${i}`);
            console.log(`Created images_${i} directory`);
        }
        if (!fs.existsSync(`${IMAGES_VISION_BASE_PATH}/vision_${i}`)) {
            fs.mkdirSync(`${IMAGES_VISION_BASE_PATH}/vision_${i}`);
            console.log(`Created vision_${i} directory`);
        }
        if (!fs.existsSync(`${PARSED_BASE_PATH}/parsed_${i}`)) {
            fs.mkdirSync(`${PARSED_BASE_PATH}/parsed_${i}`);
            console.log(`Created parsed_${i} directory`);
        }
        for (let j = 0; j < BATCH_SIZE / MICRO_BATCH_SIZE; j++) {
            if (
                !fs.existsSync(
                    `${IMAGES_BASE_PATH}/images_${i}/images_${i}${j}`
                )
            ) {
                fs.mkdirSync(`${IMAGES_BASE_PATH}/images_${i}/images_${i}${j}`);
                console.log(`Created images_${i}/images_${i}${j} directory`);
            }
            if (
                !fs.existsSync(
                    `${IMAGES_VISION_BASE_PATH}/vision_${i}/vision_${i}${j}`
                )
            ) {
                fs.mkdirSync(
                    `${IMAGES_VISION_BASE_PATH}/vision_${i}/vision_${i}${j}`
                );
                console.log(`Created vision_${i}/vision_${i}${j} directory`);
            }
        }
    }
}

async function main() {
    const argv = yargs(hideBin(process.argv)).argv;

    if (argv["type"] === "init") {
        console.log("Starting init");
        init();
    } else if (argv["type"] === "getImageSHA1") {
        console.log("Starting getImageSHA1", argv["i"]);
        await getImageSHA1(argv["i"]);
    } else if (argv["type"] === "downloadImagesFromSHA1") {
        console.log("Starting downloadImagesFromSHA1", argv["i"], argv["j"]);
        await downloadImagesFromSHA1(argv["i"], argv["j"]).then(() => {
            console.log(`Downloaded images_${argv["i"]}${argv["j"]}`);
        });
    } else if (argv["type"] === "uploadImagesToSupabase") {
        console.log("Starting uploadImagesToSupabase", argv["i"], argv["j"]);
        await uploadImagesToSupabaseStorage(argv["i"], argv["j"]);
    } else if (argv["type"] === "uploadSHA1ToSupabase") {
        console.log("Starting uploadSHA1ToSupabase", argv["i"]);
        await uploadImageSHA1ToSupabaseStorage(argv["i"]);
    } else if (argv["type"] === "parseAllImages") {
        console.log("Starting parseAllImages", argv["i"], argv["j"]);
        await parseAllImages(argv["i"], argv["j"]);
    } else if (argv["type"] === "generateShFile") {
        console.log("Starting generateShFile");
        generateShFile();
    } else if (argv["type"] === "uploadVisionResponseToSupabase") {
        console.log(
            "Starting uploadVisionResponseToSupabase",
            argv["i"],
            argv["j"]
        );
        await uploadVisionResponseToSupabaseStorage(argv["i"], argv["j"]);
    } else if (argv["type"] === "indexIntoTypesense") {
        console.log("Starting indexIntoTypesense", argv["i"]);
        await indexParsedIntoTypesense(argv["i"]);
    } else if (argv["type"] === "writeToDB") {
        console.log("Starting writeToDB", argv["i"]);
        await writeToDB(argv["i"]);
    } else if (argv["type"] === "full") {
        console.log("Starting full");
        await downloadImagesFromSHA1(argv["i"], argv["j"]);
        await Promise.all([
            uploadImagesToSupabaseStorage(argv["i"], argv["j"]),
            parseAllImages(argv["i"], argv["j"]),
        ]);
        await uploadVisionResponseToSupabaseStorage(argv["i"], argv["j"]);
    } else {
        console.log("Wrong Option");
    }
}

main();
