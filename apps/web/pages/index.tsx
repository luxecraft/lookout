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
        <title>Lookout 👀</title>
        <meta
          name="description"
          content="Lookout - A New way to look at images"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="Lookout, Image Search, Metadata, ML, Supabase, Typesense, Design"
        />
        <meta
          name="description"
          content="Metadata based Image Search using an ML processing pipeline"
        />
        <meta
          property="og:image"
          content="https://i3.lensdump.com/i/ROvj3Q.th.png"
        />
        <meta
          property="og:image:secure_url"
          content="https://i3.lensdump.com/i/ROvj3Q.th.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1920" />
        <meta property="og:image:height" content="1080" />
        <meta property="og:image:alt" content="Banner image for Lookout" />
        <meta property="og:title" content="Lookout" />
        <meta
          property="og:description"
          content="Metadata based Image Search using an ML processing pipeline. Explore more!"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@sabeshbharathi" />
        <meta name="twitter:creator" content="@sabeshbharathi" />
        <meta name="twitter:title" content="Lookout" />
        <meta
          name="twitter:description"
          content="Metadata based Image Search using an ML processing pipeline. Explore more!"
        />
        <meta
          name="twitter:image"
          content="https://i3.lensdump.com/i/ROvj3Q.th.png"
        />
        <meta name="twitter:image:alt" content="Banner image for Lookout" />
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
