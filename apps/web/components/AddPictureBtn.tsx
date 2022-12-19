import { User } from "@supabase/supabase-js";
import { FilePlus, Plus } from "phosphor-react";
import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import supabase from "../lib/SupabaseClientConfig";
import Spinner from "./Spinner";

type Props = {
  user: User | null;
  updatePosts: () => void;
};

const AddPictureBtn = (props: Props) => {
  const { user, updatePosts } = props;
  const [loading, setLoading] = useState(false);
  return (
    <div className="relative">
      <div
        className="bg-white/10 mt-10 tealShadow cursor-pointer
       ease hover:scale-105 duration-300 relative font-silk dark:bg-black/30 border-[0.05rem]
       border-gray-600 shadow-xl border-opacity-30 backdrop-blur-xl py-6 px-8 rounded-xl"
      >
        <input
          onInputCapture={async (e) => {
            setLoading(true);
            //@ts-ignore
            const file = e.target.files[0];
            console.log(file);

            //Check if image is not an image
            if (!file.type.startsWith("image/")) {
              console.log("not an image");
              return;
            }

            const fileType = file.type.split("/")[1];
            const uuid = uuidv4();
            const imgPath = "/images/users/" + uuid + "." + fileType;

            const { data, error } = await supabase.storage
              .from("master")
              .upload(imgPath, file);
            console.log(data, error);

            const res = await axios.post("/api/uploadPhoto", {
              uuid,
              imgPath,
              userImageUrl: user?.user_metadata.avatar_url,
              userId: user?.id,
            });

            console.log(res);

            updatePosts();
            setLoading(false);
          }}
          className="hidden"
          type="file"
          id="files"
          disabled={loading}
        />
        <label htmlFor="files" className="cursor-pointer">
          {loading ? (
            <Spinner />
          ) : (
            <div className="flex items-center gap-4">
              <FilePlus size={24} weight="fill" />
              Upload Image
            </div>
          )}
        </label>
      </div>
    </div>
  );
};

export default AddPictureBtn;
