import { User } from "@supabase/supabase-js";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import AddPictureBtn from "../components/AddPictureBtn";
import AuthCard from "../components/AuthCard";
import BlurryCircle from "../components/BlurryCircle";
import ProfileDetails from "../components/ProfileDetails";
import ProfileTab from "../components/ProfileTab";
import SourceLogo from "../lib/SourceLogo";
import supabase from "../lib/SupabaseClientConfig";

type Props = {};

const breakPointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1536: 4,
  1280: 3,
  1024: 3,
  640: 2,
};

const placeholderIcon = "/images/placeholder.png";

const ProfilePage = (props: Props) => {
  const [bkPoint, setBkPoint] = useState(breakPointObj);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [userPosts, setUserPosts] = useState([
    {
      id: "",
      title: "Post",
      labels: ["charm", "blue", "sky"],
      nfsw: false,
      safeSearch: false,
      source: "instagram",
      post_url: "https://www.pinterest.com/pin/90001692528045806/",
      image_url: "/images/images_0/images_00/images_000.jpeg",
    },
  ]);

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      setUserPosts((prev) => [
        ...prev,
        {
          id: "",
          title: "Post",
          labels: ["charm", "blue", "sky"],
          nfsw: false,
          safeSearch: false,
          source: "instagram",
          post_url: "https://www.pinterest.com/pin/90001692528045806/",
          image_url: `/images/images_0/images_00/images_00${i}.jpeg`,
        },
      ]);
    }
  }, []);

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
      <main className="text-black min-h-screen flex flex-col items-center p-10 dark:text-white">
        <BlurryCircle />
        <ProfileTab />
        <ProfileDetails user={user} />
        <AddPictureBtn />
        <Masonry className="flex my-10" breakpointCols={bkPoint}>
          {userPosts.map((hit) => (
            <div className="w-max m-4 imgCard" key={hit.id}>
              <div className="relative shadow-xl hover:scale-105 duration-500 transition-all rounded-md cursor-pointer w-auto overflow-hidden">
                <div className="absolute flex flex-col justify-between py-4 h-full w-full duration-500 hover:opacity-100 opacity-0 hover:dark:bg-white/40 hover:bg-black/40">
                  <div className="px-4 drop-shadow-lg">
                    <a href={hit.post_url}>
                      <SourceLogo
                        source={
                          user?.user_metadata.avatar_url ?? placeholderIcon
                        }
                      />
                    </a>
                  </div>
                  <div className="flex overflow-scroll">
                    {hit.labels.map((label, i) => (
                      <div
                        className="mx-2 whitespace-nowrap font-silk text-white bg-black/50 text-sm font-bold  rounded-md p-1"
                        key={i}
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
                <img
                  src={process.env.NEXT_PUBLIC_BLOB_URL + hit.image_url}
                  alt={hit.title}
                  className="w-full max-w-[150px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[260px] rounded-lg"
                />
              </div>
            </div>
          ))}
        </Masonry>
      </main>
    </div>
  );
};

export default ProfilePage;
