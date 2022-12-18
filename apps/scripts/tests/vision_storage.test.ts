import {
    SUPABASE_BUCKET,
    TOTAL,
    BATCH_SIZE,
    MICRO_BATCH_SIZE,
} from "../src/config";
import { supabase } from "../src/supabase";

test("check if the supabase bucket is vaild", async () => {
    const { data, error } = await supabase.storage.getBucket(SUPABASE_BUCKET);
    expect(error).toBeNull();
    expect(data).not.toBeNull();
    expect(data.name).toBe(SUPABASE_BUCKET);
});

test("check if vision_i dir exisit in bucket", async () => {
    const { data, error } = await supabase.storage
        .from(SUPABASE_BUCKET)
        .list("vision");
    expect(error).toBeNull();
    expect(data).not.toBeNull();
    const names = data.map((item) => item.name);
    for (let i = 0; i < TOTAL / BATCH_SIZE; i++) {
        expect(names).toContain(`vision_${i}`);
    }
});

test("check if vision_ij dir exisit in bucket", async () => {
    for (let i = 0; i < TOTAL / BATCH_SIZE; i++) {
        const { data, error } = await supabase.storage
            .from(SUPABASE_BUCKET)
            .list(`vision/vision_${i}`);
        expect(error).toBeNull();
        expect(data).not.toBeNull();
        const names = data.map((item) => item.name);
        for (let j = 0; j < BATCH_SIZE / MICRO_BATCH_SIZE; j++) {
            expect(names).toContain(`vision_${i}${j}`);
        }
    }
});

test("check if vision_ijk.json exisit in bucket", async () => {
    for (let i = 0; i < TOTAL / BATCH_SIZE; i++) {
        for (let j = 0; j < BATCH_SIZE / MICRO_BATCH_SIZE; j++) {
            const { data, error } = await supabase.storage
                .from(SUPABASE_BUCKET)
                .list(`vision/vision_${i}/vision_${i}${j}`);
            expect(error).toBeNull();
            expect(data).not.toBeNull();
            const names = data.map((item) => item.name);
            for (let k = 0; k < MICRO_BATCH_SIZE; k++) {
                expect(names).toContain(`vision_${i}${j}${k}.json`);
            }
        }
    }
});
