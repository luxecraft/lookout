import { connectStats } from "react-instantsearch-dom";
import React from "react";

const SearchStats = ({ processingTimeMS, nbHits }) => (
  <p className="stats">
    {nbHits.toLocaleString()} results found in{" "}
    {processingTimeMS.toLocaleString()}ms
  </p>
);

const Stats = connectStats(SearchStats);

export default Stats;
