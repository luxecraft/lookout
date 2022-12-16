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
};

const Hits = ({ hits }) => (
  <div className="">
    <Masonry className="flex" breakpointCols={breakPointObj}>
      {hits.map((hit) => (
        <div className="w-max m-4" key={hit.id}>
          <div className="relative shadow-xl hover:scale-105 duration-500 skew-y-2 transition-all rounded-md cursor-pointer w-auto overflow-hidden">
            <div className="absolute h-full w-full duration-500  hover:bg-white/40 z-40" />
            <img
              src={process.env.NEXT_PUBLIC_BLOB_URL + hit.image_url}
              alt={hit.title}
              className="w-full max-w-[250px]"
            />
          </div>
        </div>
      ))}
    </Masonry>
  </div>
);

const HitList = connectHits(Hits);
export default HitList;
