import React from "react";

import { connectHits } from "react-instantsearch-dom";

const Hits = ({ hits }) => (
  <ul className="grid grid-cols-6 gap-10">
    {hits.map((hit) => (
      <div className="border-2 border-red-500" key={hit.id}>
        <img src={process.env.NEXT_PUBLIC_BLOB_URL + hit.image_url} />
      </div>
    ))}
  </ul>
);

const HitList = connectHits(Hits);
export default HitList;
