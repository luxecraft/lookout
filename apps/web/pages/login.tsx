import Head from "next/head";
import React from "react";
import AuthCard from "../components/AuthCard";
import BlurryCircle from "../components/BlurryCircle";

type Props = {};

const LoginPage = (props: Props) => {
  return (
    <>
      <Head>
        <title>Lookout | Login</title>
        <meta
          name="description"
          content="Lookout - A New way to look at images"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="text-black min-h-screen flex flex-col items-center justify-center dark:text-white">
        <BlurryCircle />

        <AuthCard />
      </main>
    </>
  );
};

export default LoginPage;
