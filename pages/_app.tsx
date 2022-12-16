import "../styles/dist.css";
import type { AppProps } from "next/app";
import { InstantSearch } from "react-instantsearch-dom";
import searchClient from "../lib/TypesenseConfig";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <InstantSearch
      indexName={process.env.NEXT_PUBLIC_INDEX_NAME || ""}
      searchClient={searchClient}
    >
      <Component {...pageProps} />
    </InstantSearch>
  );
}
