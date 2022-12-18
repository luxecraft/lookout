import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/router";
import { GearSix, HouseSimple, Power, SignIn, UserFocus } from "phosphor-react";
import React, { useEffect, useState } from "react";
import supabase from "../lib/SupabaseClientConfig";

type Props = {};

const ProfileTab = (props: Props) => {
  const [isHovering, setIsHovering] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const getUser = async () => {
    return await supabase.auth.getUser();
  };
  const signout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsHovering(false);
    router.push("/");
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
    <div className="flex w-1/4 max-h-fit flex-col justify-end gap-4 px-10">
      <div
        onClick={() => {
          setIsHovering(!isHovering);
        }}
        className="w-fit cursor-pointer flex justify-center py-2 px-4 gap-2 dark:text-white text-black overflow-scroll items-center mx-auto bg-white/30 dark:bg-black/30 shadow-lg font-silk border-[0.05rem] border-gray-200 border-opacity-30 backdrop-blur-md rounded-xl fixed right-10 top-10 z-50"
      >
        <div>
          <GearSix
            size={18}
            className="text-black dark:text-white hover:rotate-45 duration-300"
            weight="fill"
          />
        </div>
        {/* <p>Options</p> */}
      </div>
      <div
        className={`h-30 ${
          isHovering ? "block" : "hidden"
        } profilebar py-2 ease w-fit dark:text-white text-black overflow-scroll items-center justify-start px-4 mx-auto bg-white/30 dark:bg-black/30 shadow-lg font-silk border-[0.05rem] border-gray-200 border-opacity-30 backdrop-blur-md rounded-xl fixed right-10 top-20 z-40`}
      >
        <ul className="space-y-4 divide-y-2">
          {user == null ? (
            <Link
              href="/login"
              className="dark:text-teal-400 text-teal-600 flex items-center gap-2"
            >
              <div>
                <SignIn size={24} weight="bold" />
              </div>
              Login
            </Link>
          ) : (
            <ul className="space-y-4 py-2 flex flex-col items-between divide-dotted divide-black/40 dark:divide-white/40">
              {router.pathname == "/profile" ? (
                <Link
                  href="/"
                  className="text-teal-600 dark:text-teal-400 flex items-center gap-2"
                >
                  <div>
                    <HouseSimple
                      size={24}
                      className="text-teal-600 dark:text-teal-400"
                      weight="bold"
                    />
                  </div>
                  Home
                </Link>
              ) : (
                <Link
                  href="/profile"
                  className="text-teal-600 dark:text-teal-400 flex items-center justify-between gap-2"
                >
                  <div>
                    <UserFocus
                      size={24}
                      className="text-teal-600 dark:text-teal-400"
                      weight="fill"
                    />
                  </div>
                  Profile
                </Link>
              )}
              <div
                onClick={signout}
                className="text-red-600 dark:text-red-400 flex items-center gap-2 cursor-pointer"
              >
                <div>
                  <Power
                    size={24}
                    className="text-red-600 dark:text-red-400"
                    weight="bold"
                  />
                </div>
                Logout
              </div>
            </ul>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProfileTab;
