import Head from "next/head";
import BlurryCircle from "../components/BlurryCircle";
import HitList from "../components/HitList";
import SearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen dark-pattern p-10 flex flex-col items-center justify-center after-splash">
        <BlurryCircle />

        <HitList />

        <SearchBar />
      </main>

      <footer></footer>
    </div>
  );
}
