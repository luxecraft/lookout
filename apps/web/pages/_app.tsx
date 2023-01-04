import "../styles/globals.css";
import type { AppProps } from "next/app";
import { InstantSearch } from "react-instantsearch-dom";
import searchClient from "../lib/TypesenseConfig";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    //Add keydown event listener to the input
    document.addEventListener("keydown", (e) => {
      //If the key is Tab, prevent the default behavior
      if (e.key === "Tab") {
        e.preventDefault();
      }
    });

    return () => {
      //Remove the event listener when the component is unmounted
      document.removeEventListener("keydown", (e) => {
        if (e.key === "Tab") {
          e.preventDefault();
        }
      });
    };
  }, []);

  return (
    <InstantSearch
      indexName={process.env.NEXT_PUBLIC_INDEX_NAME || ""}
      searchClient={searchClient}
    >
      <Component {...pageProps} />
    </InstantSearch>
  );
}
