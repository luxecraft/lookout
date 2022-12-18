//NextJS Api that takes a picture and uploads it to a supabase bucket
import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../lib/SupabaseServerConfig";
import { v4 as uuidv4 } from "uuid";

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
  const uuid = uuidv4();

  const { imgPath, userImageUrl, userId } = req.body;

  const { data, error } = await supabase.from("images").insert([
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
    res.status(500).json({ error: error.message });
  }

  res.status(200);
}
