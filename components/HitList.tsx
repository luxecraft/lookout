import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { isEqual } from 'lodash';
// import Image from 'next/image';
import { connectHits } from "react-instantsearch-dom";

const breakPointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  570: 1,
};

const Hits = ({ hits }) => {
  const [bkPoint, setBkPoint] = useState(breakPointObj);
  useEffect(() => {
    if (hits.length < 3) {
      setBkPoint({
        ...breakPointObj,
        default: 2,
        3000: 2,
        2000: 2,
        1200: 2,
      })
    } else if (hits.length < 4) {
      setBkPoint({
        ...breakPointObj,
        default: 3,
        3000: 3,
        2000: 3,
      })
    } else if (hits.length < 5) {
      setBkPoint({
        ...breakPointObj,
        3000: 4,
        2000: 4,
      })
    } else if (hits.length > 5 && !isEqual(bkPoint, breakPointObj)) {
      setBkPoint(breakPointObj);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hits]);
  return (
    <Masonry className="flex" breakpointCols={bkPoint}>
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
              className="w-full max-w-[250px] rounded-lg"
            />
          </div>
        </div>
      ))}
    </Masonry>
  );
}
const HitList = connectHits(Hits);
export default HitList;
