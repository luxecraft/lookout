//NextJS Api that takes a picture and uploads it to a supabase bucket
import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../lib/SupabaseServerConfig";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb", // Set desired value here
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uuid, imgPath, userImageUrl, userId } = req.body;

  const { data, error } = await supabase.from("master").insert([
    {
      id: uuid,
      sub: imgPath,
      source: userImageUrl,
      nfsw: false,
      labels: [],
      text: [],
      safe_search: [],
      colors: [],
      image_url: imgPath,
      user_id: userId,
    },
  ]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data);
}
