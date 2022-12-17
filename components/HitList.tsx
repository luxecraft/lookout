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
          <div className="relative shadow-xl hover:scale-105 duration-500 skew-y-3 transition-all rounded-md cursor-pointer w-auto overflow-hidden">
            <div className="absolute p-2 flex items-end overflow-scroll h-full w-full duration-500 hover:opacity-100 opacity-0 hover:dark:bg-white/40 hover:bg-black/40">
              {hit.labels.map((label) => (
                <div
                  className="mx-2 whitespace-nowrap font-silk text-white bg-black/50 text-sm font-bold  rounded-md p-1"
                  key={label.id}
                >
                  {label}
                </div>
              ))}
            </div>
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
