import Link from "next/link";
import { IdentificationCard } from "phosphor-react";
import React, { useState } from "react";

type Props = {};

const ProfileTab = (props: Props) => {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div className="w-1/4 max-h-fit flex flex-col justify-end gap-4 px-10">
      <div
        className={`h-30 ${
          isHovering ? "block" : "hidden"
        } profilebar py-2 ease w-1/2  dark:text-white text-black overflow-scroll items-center justify-start px-4 mx-auto bg-white/30 dark:bg-black/30 shadow-lg font-silk border-[0.05rem] border-gray-200 border-opacity-30 backdrop-blur-md rounded-xl`}
      >
        <ul className="space-y-4 divide-y-2">
          <Link href="/login" className="dark:text-teal-400 text-teal-600">
            Login
          </Link>
        </ul>
      </div>

      <div
        onClick={() => {
          setIsHovering(!isHovering);
        }}
        className="w-1/2 cursor-pointer flex py-2 gap-2 dark:text-white text-black overflow-scroll items-center justify-start px-4 mx-auto bg-white/30 dark:bg-black/30 shadow-lg font-silk border-[0.05rem] border-gray-200 border-opacity-30 backdrop-blur-md rounded-xl"
      >
        <IdentificationCard
          size={32}
          className="text-black dark:text-white"
          weight="fill"
        />
        <p>Profile</p>
      </div>
    </div>
  );
};

export default ProfileTab;
