import Head from "next/head";
import BlurryCircle from "../components/BlurryCircle";
import BottomBar from "../components/BottomBar";
import HitList from "../components/HitList";
import SearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <div>
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

        <HitList />

        <BottomBar />
      </main>

      <footer></footer>
    </div>
  );
}
