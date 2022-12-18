import { FilePlus, Plus } from "phosphor-react";
import React from "react";

type Props = {};

const AddPictureBtn = (props: Props) => {
  return (
    <div className="relative">
      <div
        className="bg-white/10 mt-10 tealShadow cursor-pointer
       ease hover:scale-105 duration-300 relative flex gap-4 
       items-center font-silk dark:bg-black/30 border-[0.05rem]
       border-gray-600 shadow-xl border-opacity-30 backdrop-blur-xl py-6 px-8 rounded-xl"
      >
        <FilePlus size={24} weight="fill" />
        <p>Upload Image</p>
      </div>
    </div>
  );
};

export default AddPictureBtn;
