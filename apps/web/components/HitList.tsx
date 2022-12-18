/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import Masonry from "react-masonry-css";
import { isEqual } from "lodash";
// import Image from 'next/image';
import { connectInfiniteHits } from "react-instantsearch-dom";
import SourceLogo from "../lib/SourceLogo";

const breakPointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  570: 1,
};

const Hits = ({ hits, hasMore, refineNext }) => {
  const [bkPoint, setBkPoint] = useState(breakPointObj);
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (sentinelRef.current !== null) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMore) {
            refineNext();
          }
        });
      });

      observer.observe(sentinelRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [hasMore, refineNext]);

  useEffect(() => {
    if (hits.length < 3) {
      setBkPoint({
        ...breakPointObj,
        default: 2,
        3000: 2,
        2000: 2,
        1200: 2,
      });
    } else if (hits.length < 4) {
      setBkPoint({
        ...breakPointObj,
        default: 3,
        3000: 3,
        2000: 3,
      });
    } else if (hits.length < 5) {
      setBkPoint({
        ...breakPointObj,
        3000: 4,
        2000: 4,
      });
    } else if (hits.length > 5 && !isEqual(bkPoint, breakPointObj)) {
      setBkPoint(breakPointObj);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hits]);
  return (
    <Masonry className="flex" breakpointCols={bkPoint}>
      {hits.map((hit) => (
        <div className="w-max m-4 imgCard" key={hit.id}>
          <div className="relative shadow-xl hover:scale-105 duration-500 transition-all rounded-md cursor-pointer w-auto overflow-hidden">
            <div className="absolute flex flex-col justify-between py-4 h-full w-full duration-500 hover:opacity-100 opacity-0 hover:dark:bg-white/40 hover:bg-black/40">
              <div className="px-4 drop-shadow-lg">
                <a href={hit.post_url}>
                  <SourceLogo source={hit.source} />
                </a>
              </div>
              <div className="flex overflow-scroll">
                {hit.labels.map((label) => (
                  <div
                    className="mx-2 whitespace-nowrap font-silk text-white bg-black/50 text-sm font-bold  rounded-md p-1"
                    key={label.id}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
            <img
              src={process.env.NEXT_PUBLIC_BLOB_URL + hit.image_url}
              alt={hit.title}
              className="w-full max-w-[250px] rounded-lg"
            />
          </div>
        </div>
      ))}
      <li
        className="ais-InfiniteHits-sentinel"
        ref={sentinelRef}
        aria-hidden="true"
      />
    </Masonry>
  );
};
const HitList = connectInfiniteHits(Hits);
export default HitList;
