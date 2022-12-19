/* eslint-disable @next/next/no-img-element */
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  createRef,
} from "react";
import Masonry from "react-masonry-css";
import { isEqual } from "lodash";
import {
  connectInfiniteHits,
  connectStateResults,
} from "react-instantsearch-dom";
import SourceLogo from "../lib/SourceLogo";
import Spinner from "./Spinner";

const breakPointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1536: 4,
  1280: 3,
  1024: 3,
  640: 2,
};

const LoadingIndicator = connectStateResults(({ isSearchStalled }) =>
  isSearchStalled ? (
    <div className="w-full flex justify-center">
      <Spinner />
    </div>
  ) : null
);

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
        1536: 2,
        1280: 2,
        1024: 2,
      });
    } else if (hits.length < 4) {
      setBkPoint({
        ...breakPointObj,
        default: 3,
        3000: 3,
        2000: 3,
        1536: 3,
      });
    } else if (hits.length < 5) {
      setBkPoint({
        ...breakPointObj,
        3000: 4,
        2000: 4,
      });
    } else if (hits.length >= 5 && !isEqual(bkPoint, breakPointObj)) {
      setBkPoint(breakPointObj);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hits]);

  const cardRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);
  cardRefs.current = hits.map((_, i) => (cardRefs.current[i] = createRef()));

  const cardThreeDRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);
  cardThreeDRefs.current = hits.map(
    (_, i) => (cardThreeDRefs.current[i] = createRef())
  );

  const onTiltCard = useCallback((e: React.MouseEvent, index: number) => {
    let w = cardRefs.current[index].current?.clientWidth;
    let h = cardRefs.current[index].current?.clientHeight;
    let b = cardRefs.current[index].current?.getBoundingClientRect();
    let X = (e.clientX - b!.left) / w!;
    let Y = (e.clientY - b!.top) / h!;

    let rX = -(X - 0.5) * 26;
    let rY = (Y - 0.5) * 26;

    if (cardThreeDRefs.current[index].current) {
      cardThreeDRefs.current[
        index
      ].current!.style.transform = `rotateY(${rX}deg) rotateX(${rY}deg)`;
    }
  }, []);

  const onUntiltCard = useCallback((e: React.MouseEvent, index: number) => {
    if (cardThreeDRefs.current[index].current) {
      cardThreeDRefs.current[
        index
      ].current!.style.transform = `rotateY(0deg) rotateX(0deg)`;
    }
  }, []);

  return (
    <Masonry className="flex" breakpointCols={bkPoint}>
      {hits.map((hit, index) => (
        <div className="w-max mx-4 my-8 imgCard" key={hit.id}>
          <div className="card">
            <div className="card__wrapper">
              <div className="card__3d" ref={cardThreeDRefs.current[index]}>
                <div
                  className="relative shadow-xl hover:scale-105 duration-500 transition-all rounded-md cursor-pointer overflow-hidden w-full max-w-[150px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[260px]"
                  ref={cardRefs.current[index]}
                  onMouseMove={(e) => onTiltCard(e, index)}
                  onMouseLeave={(e) => onUntiltCard(e, index)}
                >
                  <div className="absolute flex flex-col justify-between py-4 h-full w-full duration-500 hover:opacity-100 opacity-0 hover:dark:bg-white/30  hover:bg-black/30 z-10">
                    <div className="px-4 drop-shadow-lg">
                      <a
                        href={hit.post_url}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <SourceLogo source={hit.source} />
                      </a>
                    </div>
                    <div className="flex px-2 overflow-scroll">
                      {hit.labels.map((label) => (
                        <div
                          className="mx-2 whitespace-nowrap  font-silk text-white bg-black/50 text-xs md:text-sm font-bold  rounded-md p-1"
                          key={label.id}
                        >
                          {label}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="card__image">
                    <img
                      src={process.env.NEXT_PUBLIC_BLOB_URL + hit.image_url}
                      alt={hit.title}
                      className="w-full max-w-[150px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[260px] rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
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
