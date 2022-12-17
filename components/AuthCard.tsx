import Link from "next/link";
import { GithubLogo, GoogleLogo, UserCirclePlus } from "phosphor-react";
import React from "react";
import supabase from "../lib/SupabaseConfig";

type Props = {};

const AuthCard = (props: Props) => {
  const loginWithGithub = async () => {
    let { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };

  const loginWithGoogle = async () => {
    let { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div className="relative w-1/3">
      <Link className="flex items-center justify-center" href="/">
        <div className="absolute flex items-end justify-center cursor-pointer -bottom-10 popcard hover:translate-y-2 duration-300 w-3/4 bg-white/10 popcard dark:bg-black/30 border-[0.05rem] border-gray-600  border-opacity-30 backdrop-blur-sm pt-20 pb-2 rounded-xl shadow-xl">
          <p className="text-center text-lg font-silk">Home</p>
        </div>
      </Link>
      <div className="bg-white/10 popcard dark:bg-black/30 border-[0.05rem] border-gray-600  border-opacity-30 backdrop-blur-md p-16 rounded-xl shadow-xl">
        <div className="flex items-center justify-center mb-5 gap-2">
          <UserCirclePlus
            size={38}
            className="text-black mt-1 dark:text-white"
            weight="fill"
          />
          <h1 className="text-4xl text-center font-silk">Login</h1>
        </div>
        <p className="text-sm text-center font-silk mb-10">
          Signup/Login to get access to exciting features like uploading{" "}
          <b className="text-teal-400">your own looks</b> to our system!
        </p>
        <div className="w-full space-y-10">
          <button
            type="button"
            onClick={() => loginWithGithub()}
            className="font-silk w-full gradient-btn duration-300 text-white rounded-md p-2 shadow-lg"
          >
            <div className="flex items-center justify-center gap-4">
              <GithubLogo size={24} className="text-white" weight="fill" />
              Login with Github
            </div>
          </button>

          <button
            type="button"
            onClick={() => loginWithGoogle()}
            className="font-silk w-full gradient-btn duration-300 text-white rounded-md p-2 shadow-lg"
          >
            <div className="flex items-center justify-center gap-4">
              <GoogleLogo size={24} className="text-white" weight="fill" />
              Login with Google
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
