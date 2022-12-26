import Head from "next/head";
import { useEffect, useState } from "react";
import BlurryCircle from "../components/BlurryCircle";
import BottomBar from "../components/BottomBar";
import HitList from "../components/HitList";
import Onboarding from "../components/Onboarding";
import ProfileTab from "../components/ProfileTab";

export default function Home() {
  const [hasOnboarded, setHasOnboarded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasOnboarded = localStorage.getItem("hasOnboarded");
      if (hasOnboarded && hasOnboarded == "true") {
        setHasOnboarded(true);
      }
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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
          key="viewport"
        />
        <meta
          name="keywords"
          content="Lookout, Image Search, Metadata, ML, Supabase, Typesense, Design"
          key="keywords"
        />
        <meta
          name="description"
          content="Metadata based Image Search using an ML processing pipeline"
          key="description"
        />
        <meta
          property="og:image"
          content="https://i3.lensdump.com/i/ROvj3Q.png"
          key="og:image"
        />
        <meta
          property="og:image:secure_url"
          content="https://i3.lensdump.com/i/ROvj3Q.png"
          key="og:image:secure_url"
        />
        <meta
          property="og:image:type"
          content="image/png"
          key="og:image:type"
        />
        <meta property="og:image:width" content="3248" key="og:image:width" />
        <meta property="og:image:height" content="1990" key="og:image:height" />
        <meta
          property="og:image:alt"
          content="Banner image for Lookout"
          key="og:image:alt"
        />
        <meta property="og:title" content="Lookout" key="og:title" />
        <meta
          property="og:description"
          content="Metadata based Image Search using an ML processing pipeline. Explore more!"
          key="og:description"
        />
        <meta property="og:type" content="website" key="og:type" />
        <meta
          name="twitter:card"
          content="summary_large_image"
          key="twitter:card"
        />
        <meta
          name="twitter:site"
          content="@sabeshbharathi"
          key="twitter:site"
        />
        <meta
          name="twitter:creator"
          content="@sabeshbharathi"
          key="twitter:creator"
        />
        <meta name="twitter:title" content="Lookout" key="twitter:title" />
        <meta
          name="twitter:description"
          content="Metadata based Image Search using an ML processing pipeline. Explore more!"
          key="twitter:description"
        />
        <meta
          name="twitter:image"
          content="https://i3.lensdump.com/i/ROvj3Q.png"
          key="twitter:image"
        />
        <meta
          name="twitter:image:alt"
          content="Banner image for Lookout"
          key="twitter:image:alt"
        />
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
