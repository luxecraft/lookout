import Head from "next/head";
import { useEffect, useState } from "react";
import BlurryCircle from "../components/BlurryCircle";
import BottomBar from "../components/BottomBar";
import HitList from "../components/HitList";
import Onboarding from "../components/Onboarding";
import ProfileTab from "../components/ProfileTab";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [hasOnboarded, setHasOnboarded] = useState(false);

  useEffect(() => {
    const hasOnboarded = localStorage.getItem("hasOnboarded");
    if (hasOnboarded && hasOnboarded == "true") {
      setHasOnboarded(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Lookout</title>
        <meta
          name="description"
          content="Lookout - A New way to look at images"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen dark-pattern p-10 flex flex-col items-center justify-center after-splash">
        <BlurryCircle />

        {hasOnboarded ? (
          <>
            <h1 className="text-black/70 duration-300 mb-4 text-center dark:text-white/70 font-silk text-xl md:text-3xl">
              Lookout 👀
            </h1>
            <ProfileTab />
            <HitList />
            <BottomBar />
          </>
        ) : (
          <Onboarding setHasOnboarded={setHasOnboarded} />
        )}
      </main>
    </>
  );
}
