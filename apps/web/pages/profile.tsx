import { AuthUser as User } from "@supabase/supabase-js";
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
import axios from "axios";
import { isEqual } from "lodash";

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
  const [userPosts, setUserPosts] = useState<any>([]);

  useEffect(() => {
    updatePosts();
  }, [user]);

  useEffect(() => {
    if (userPosts.length < 3) {
      setBkPoint({
        ...breakPointObj,
        default: 2,
        3000: 2,
        2000: 2,
        1536: 2,
        1280: 2,
        1024: 2,
      });
    } else if (userPosts.length < 4) {
      setBkPoint({
        ...breakPointObj,
        default: 3,
        3000: 3,
        2000: 3,
        1536: 3,
      });
    } else if (userPosts.length < 5) {
      setBkPoint({
        ...breakPointObj,
        3000: 4,
        2000: 4,
      });
    } else if (userPosts.length >= 5 && !isEqual(bkPoint, breakPointObj)) {
      setBkPoint(breakPointObj);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPosts]);

  const getUser = async () => {
    return await supabase.auth.getUser();
  };
  useEffect(() => {
    const user = getUser();
    user.then((res) => {
      if (res) {
        if (res.data.user != null) {
          setUser(res.data.user);
          return;
        }
      }
      router.push("/");
    });
  }, [router]);


  const updatePosts = async () => {
    //Get all images of user with user id
    if (user?.id != undefined) {
      const res = await axios.post("/api/getPhotos", { userId: user?.id });

      if (res.data) {
        if (Array.isArray(res.data)) {
          setUserPosts(res.data);
          console.log(res.data);
        } else {
          console.log(typeof res.data.data);
        }
      }
    }
  };

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
        <AddPictureBtn user={user} updatePosts={updatePosts} />
        <Masonry className="flex my-10" breakpointCols={bkPoint}>
          {userPosts.map((hit, i) => (
            <div className="w-max m-4 imgCard" key={i}>
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
        {userPosts.length == 0 && (
          <div className="font-silk">
            <h1 className=" md:text-2xl text-center font-bold">
              Add some images to get started
            </h1>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;
