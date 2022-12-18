import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { GearSix, IdentificationCard, Power, UserFocus } from "phosphor-react";
import React, { useEffect, useState } from "react";
import supabase from "../lib/SupabaseConfig";

type Props = {};

const ProfileTab = (props: Props) => {
  const [isHovering, setIsHovering] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const getUser = async () => {
    return await supabase.auth.getUser();
  };

  useEffect(() => {
    const user = getUser();
    user.then((res) => {
      if (res) {
        setUser(res.data.user);
      }
    });
  }, []);

  return (
    <div className="hidden md:flex w-1/4 max-h-fit flex-col justify-end gap-4 px-10">
      <div
        className={`h-30 ${
          isHovering ? "block" : "hidden"
        } profilebar py-2 ease lg:w-3/4 xl:w-1/2 dark:text-white text-black overflow-scroll items-center justify-start px-4 mx-auto bg-white/30 dark:bg-black/30 shadow-lg font-silk border-[0.05rem] border-gray-200 border-opacity-30 backdrop-blur-md rounded-xl`}
      >
        <ul className="space-y-4 divide-y-2">
          {user == null ? (
            <Link href="/login" className="dark:text-teal-400 text-teal-600">
              Login
            </Link>
          ) : (
            <ul className="space-y-4 py-2 flex flex-col items-center divide-dotted divide-black/40 dark:divide-white/40">
              <Link
                href="/profile"
                className="text-teal-600 dark:text-teal-400 flex items-center gap-2"
              >
                <UserFocus
                  size={24}
                  className="text-teal-600 dark:text-teal-400"
                  weight="fill"
                />
                Profile
              </Link>
              <div
                onClick={async () => {
                  await supabase.auth.signOut();
                  setUser(null);
                }}
                className="text-red-600 dark:text-red-400 flex items-center gap-2 cursor-pointer"
              >
                <Power
                  size={24}
                  className="text-red-600 dark:text-red-400"
                  weight="bold"
                />
                Logout
              </div>
            </ul>
          )}
        </ul>
      </div>

      <div
        onClick={() => {
          setIsHovering(!isHovering);
        }}
        className="lg:w-3/4 xl:w-1/2 cursor-pointer flex justify-center py-2 gap-2 dark:text-white text-black overflow-scroll items-center px-4 mx-auto bg-white/30 dark:bg-black/30 shadow-lg font-silk border-[0.05rem] border-gray-200 border-opacity-30 backdrop-blur-md rounded-xl"
      >
        <GearSix
          size={18}
          className="text-black dark:text-white hover:rotate-45 duration-300"
          weight="fill"
        />
        <p>Options</p>
      </div>
    </div>
  );
};

export default ProfileTab;
