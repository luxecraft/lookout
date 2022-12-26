import { AuthUser as User } from "@supabase/supabase-js";
import { FilePlus, Plus } from "phosphor-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import supabase from "../lib/SupabaseClientConfig";
import Spinner from "./Spinner";
import { generateCaption } from "../lib/CaptionGenerator";

type Props = {
  user: User | null;
  updatePosts: () => void;
};

const msgMap = {
  "ML_PROCESSING": { text: "Creating the perfect image for you", value: "25" },
  "ML_COMPLETE": { text: "Cooking up a visual masterpiece for you", value: "50" },
  "INDEX_WRITE_COMPLETE": { text: "Crafting the perfect blend for image search", value: "99" },
}

const AddPictureBtn = (props: Props) => {
  const { user, updatePosts } = props;
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: '', value: '0' });
  const [loadingText, setLoadingText] = useState("Please Wait");

  const uploadPic = async (e: React.FormEvent<HTMLInputElement>) => {
    setLoading(true);
    //@ts-ignore
    const file = e.target.files[0];

    if (file && file.size > 2048000) {
      alert('Upload file less than 2 MB');
      return;
    }

    //Check if image is not an image
    if (!file.type.startsWith("image/")) {
      console.log("not an image");
      return;
    }

    const fileType = file.type.split("/")[1];
    const uuid = uuidv4();
    const imgPath = "/images/users/" + uuid + "." + fileType;

    const channel = supabase.channel(uuid);
    const subscribe = await new Promise((resolve) => {
      channel.subscribe((payload) => {
        resolve(payload);
      });
    });

    if (subscribe === "SUBSCRIBED") {
      channel.on("broadcast", { event: "progress" }, (payload) => {
        if (payload.payload.message === "INDEX_WRITE_COMPLETE") {
          setMsg({ text: '', value: '0' });
        } else {
          setMsg(msgMap[payload.payload.message]);
        }
      });
    }
    const { data, error } = await supabase.storage
      .from("master")
      .upload(imgPath, file);

    const res = await axios.post("/api/uploadPhoto", {
      uuid,
      imgPath,
      userImageUrl: user?.user_metadata.avatar_url,
      userId: user?.id,
    });

    updatePosts();
    setLoading(false);
  }

  useEffect(() => {
    setInterval(() => {
      setLoadingText(generateCaption());
    }, 4000);
  }, []);

  return (
    <div className="relative">
      <div
        className="bg-white/10 mt-10 tealShadow cursor-pointer
       ease hover:scale-105 duration-300 relative font-silk dark:bg-black/30 border-[0.05rem]
       border-gray-600 shadow-xl border-opacity-30 backdrop-blur-xl py-6 px-8 rounded-xl"
      >
        <input
          onInputCapture={uploadPic}
          className="hidden"
          type="file"
          id="files"
          disabled={loading}
        />
        <label htmlFor="files" className="cursor-pointer">
          {loading ? (
            <div className="flex items-center gap-4">
              <Spinner />
              <p className="fadein">{loadingText}</p>
            </div>
          ) : (
            <>
              {msg?.text === '' ? (
                <div className="flex items-center gap-4">
                  <FilePlus size={24} weight="fill" />
                  Upload Image ( &lt;2MB )
                </div>
              ) : null}
            </>
          )}
        </label>
        {msg?.text ? (
          <label className="cursor-pointer">
            <div className="flex flex-col items-center gap-4">
              <div className="w-full bg-white/10 rounded-xl">
                <div className="bg-teal-400 rounded-xl flex items-center justify-center transition duration-500" style={{ width: `${msg?.value}%` }}>
                  <span>{`${msg?.value}%`}</span>
                </div>
              </div>
              <p className="fadein">{msg?.text}</p>
            </div>
          </label>
        ) : null}
      </div>
    </div>
  );
};

export default AddPictureBtn;
