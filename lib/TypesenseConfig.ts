import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: process.env.NEXT_PUBLIC_TYPESENSE_API_KEY || "",
    nodes: [
      {
        host: process.env.NEXT_PUBLIC_TYPESENSE_URL || "",
        port: 443,
        protocol: "https",
      },
    ],
  },
  additionalSearchParameters: {
    query_by: "labels, text, source",
    query_by_weights: "2, 1, 1",
    drop_tokens_threshold: 10000,
    use_cache: true,
    facet_by: "labels, nfsw, safeSearch, source",
    per_page: 30,
  },
});

const searchClient = typesenseInstantsearchAdapter.searchClient;

export default searchClient;
