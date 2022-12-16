import React from "react";
import Masonry from "react-masonry-css";
// import Image from 'next/image';
import { connectHits } from "react-instantsearch-dom";

const breakPointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
}

const Hits = ({ hits }) => (
  <div className="h-full">
    <Masonry className="flex" breakpointCols={breakPointObj}>
      {hits.map((hit) => (
        <div className="w-max m-2" key={hit.id}>
          <div className="relative cursor-zoom-in w-auto hover:shadow-lg overflow-hidden transition-all duration-500 ease-in-out">
            {/* <Image src={process.env.NEXT_PUBLIC_BLOB_URL + hit.image_url} alt={hit.title} fill className="w-full max-w-[250px]" /> */}
            <img src={process.env.NEXT_PUBLIC_BLOB_URL + hit.image_url} alt={hit.title} className="w-full max-w-[250px]" />
          </div>
        </div>
      ))}
    </Masonry>
  </div>
);

const HitList = connectHits(Hits);
export default HitList;
