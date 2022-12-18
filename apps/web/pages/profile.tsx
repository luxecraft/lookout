import { User } from "@supabase/supabase-js";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AuthCard from "../components/AuthCard";
import BlurryCircle from "../components/BlurryCircle";
import ProfileDetails from "../components/ProfileDetails";
import supabase from "../lib/SupabaseConfig";

type Props = {};

const ProfilePage = (props: Props) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const getUser = async () => {
    return await supabase.auth.getUser();
  };
  useEffect(() => {
    const user = getUser();
    user.then((res) => {
      if (res) {
        if (res.data.user != null) {
          setUser(res.data.user);
          console.log(res.data.user);
          return;
        }
      }
      router.push("/");
    });
  }, [router]);

  return (
    <div>
      <Head>
        <title>Lookout | Profile</title>
        <meta
          name="description"
          content="Lookout - A New way to look at images"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-black min-h-screen flex flex-col items-center justify-center dark:text-white">
        <BlurryCircle />
        <ProfileDetails user={user} />
      </main>
    </div>
  );
};

export default ProfilePage;
