//NextJS Api that fetches images of a user given user id from supabase
import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../lib/SupabaseServerConfig";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.body;

  const { data, error } = await supabase
    .from("images")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
}
