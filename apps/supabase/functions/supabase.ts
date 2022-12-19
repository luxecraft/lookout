import { createClient } from "https://esm.sh/@supabase/supabase-js@2.2.1";
import { SUPABASE_KEY, SUPABASE_URL } from "./config.ts";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    realtime: {
        params: {
            eventsPerSecond: 100,
        },
    },
});
