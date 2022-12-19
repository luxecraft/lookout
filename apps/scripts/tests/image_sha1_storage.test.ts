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

test("check if image_sha1_i dir exisit in bucket", async () => {
    const { data, error } = await supabase.storage
        .from(SUPABASE_BUCKET)
        .list("image_sha1");
    expect(error).toBeNull();
    expect(data).not.toBeNull();
    const names = data.map((item) => item.name);
    for (let i = 0; i < TOTAL / BATCH_SIZE; i++) {
        expect(names).toContain(`image_sha1_${i}`);
    }
});

test("check if image_sha1_ij.json dir exisit in bucket", async () => {
    for (let i = 0; i < TOTAL / BATCH_SIZE; i++) {
        const { data, error } = await supabase.storage
            .from(SUPABASE_BUCKET)
            .list(`image_sha1/image_sha1_${i}`);
        expect(error).toBeNull();
        expect(data).not.toBeNull();
        const names = data.map((item) => item.name);
        for (let j = 0; j < BATCH_SIZE / MICRO_BATCH_SIZE; j++) {
            expect(names).toContain(`image_sha1_${i}${j}.json`);
        }
    }
});
