import dotenv from "dotenv";

dotenv.config();
const MICRO_BATCH_SIZE = parseInt(process.env.MICRO_BATCH_SIZE ?? "100");
const BATCH_SIZE = parseInt(process.env.BATCH_SIZE ?? "1000");
const BASE_IMAGE_SHA_URL = "https://imageapi.same.energy/homepage";
const BASE_BLOB_URL = "https://blobcdn.same.energy/thumbnails/blobs";
const TOTAL = parseInt(process.env.TOTAL ?? "10000");
const IMAGE_SHA1_BASE_PATH = "./data/image_sha1";
const IMAGES_BASE_PATH = "./data/images";
const IMAGES_VISION_BASE_PATH = "./data/vision";
const PARSED_BASE_PATH = "./data/parsed";
const DATA_BASE_PATH = "./data";
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const SUPABASE_BUCKET = process.env.SUPABASE_BUCKET;
const BATCH_ANNOTATE_IMAGES = 5;
const TYPESENSE_API_KEY = process.env.TYPESENSE_API_KEY;
const TYPESENSE_URL = process.env.TYPESENSE_URL;
const TYPESENSE_INDEX_NAME = process.env.TYPESENSE_INDEX_NAME;

export {
    MICRO_BATCH_SIZE,
    BATCH_SIZE,
    BASE_IMAGE_SHA_URL,
    BASE_BLOB_URL,
    TOTAL,
    IMAGE_SHA1_BASE_PATH,
    IMAGES_BASE_PATH,
    IMAGES_VISION_BASE_PATH,
    DATA_BASE_PATH,
    SUPABASE_URL,
    SUPABASE_KEY,
    SUPABASE_BUCKET,
    BATCH_ANNOTATE_IMAGES,
    PARSED_BASE_PATH,
    TYPESENSE_API_KEY,
    TYPESENSE_URL,
    TYPESENSE_INDEX_NAME,
};

// https://blobcdn.same.energy/thumbnails/blobs/a/93/81/938154c52422807bfaf6fc9f0a7cfdbbaa382863.jpeg
