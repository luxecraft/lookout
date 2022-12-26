import { AuthUser as User } from "@supabase/supabase-js";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { createRef, useCallback, useEffect, useRef, useState } from "react";
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
        }
      }
    }
  };

  const cardRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);
  cardRefs.current = userPosts.map((_, i) => cardRefs.current[i] = createRef());

  const cardThreeDRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);
  cardThreeDRefs.current = userPosts.map((_, i) => cardThreeDRefs.current[i] = createRef());

  const onTiltCard = useCallback((e: React.MouseEvent, index: number) => {
    let w = cardRefs.current[index].current?.clientWidth;
    let h = cardRefs.current[index].current?.clientHeight;
    let b = cardRefs.current[index].current?.getBoundingClientRect();
    let X = (e.clientX - b!.left) / w!;
    let Y = (e.clientY - b!.top) / h!;

    let rX = -(X - 0.5) * 26;
    let rY = (Y - 0.5) * 26;

    if (cardThreeDRefs.current[index].current) {
      cardThreeDRefs.current[index].current!.style.transform = `rotateY(${rX}deg) rotateX(${rY}deg)`;
    }
  }, []);

  const onUntiltCard = useCallback((e: React.MouseEvent, index: number) => {
    if (cardThreeDRefs.current[index].current) {
      cardThreeDRefs.current[index].current!.style.transform = `rotateY(0deg) rotateX(0deg)`;
    }
  }, [])

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
            <div className="w-max mx-4 my-8 imgCard" key={i}>
              <div className="card">
                <div className="card__wrapper">
                  <div className="card__3d" ref={cardThreeDRefs.current[i]}>
                    <div className="relative shadow-xl hover:scale-105 duration-500 transition-all rounded-md cursor-pointer overflow-hidden w-full max-w-[150px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[260px]" ref={cardRefs.current[i]} onMouseMove={(e) => onTiltCard(e, i)} onMouseLeave={(e) => onUntiltCard(e, i)}>
                      <div className="absolute flex flex-col justify-between py-4 h-full w-full duration-500 hover:opacity-100 opacity-0 hover:dark:bg-white/40 hover:bg-black/40 z-10">
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
                      <div className="card__image">
                        <img
                          src={process.env.NEXT_PUBLIC_BLOB_URL + hit.image_url}
                          alt={hit.title}
                          className="w-full max-w-[150px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[260px] rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
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
