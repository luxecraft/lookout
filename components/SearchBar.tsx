import React, { useEffect, useRef, useState } from "react";
import { SearchBox, connectSearchBox } from "react-instantsearch-dom";
import { BookmarkSimple, Cube, MagnifyingGlass } from "phosphor-react";
const Searcher = ({ currentRefinement, refine }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [labels, setLabels] = useState<string[]>([]);
  const [latestLabelHighlighted, setLatestLabelHighlighted] = useState(false);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Tab") {
        setLabels([...labels, query]);
        setQuery("");
      }

      if (e.key === "Backspace" && query === "") {
        if (latestLabelHighlighted) {
          setLabels(labels.slice(0, -1));
          setLatestLabelHighlighted(false);
        } else {
          setLatestLabelHighlighted(true);
        }
      }
    };

    //Add keydown event listener to the input
    inputRef.current?.addEventListener("keydown", listener);

    return () => {
      inputRef.current?.removeEventListener("keydown", listener);
    };
  }, [query, labels, latestLabelHighlighted]);

  useEffect(() => {
    refine(query);
  }, [query]);

  return (
    <div className="fixed w-full bottom-10">
      <div className="relative flex py-2 overflow-scroll items-center justify-start px-4 w-1/2 mx-auto bg-black/30 shadow-lg font-silkRegular border-[0.05rem] border-gray-200 border-opacity-30 backdrop-blur-md rounded-xl">
        <MagnifyingGlass
          className="mr-2"
          size={20}
          color="#fcf8f8"
          weight="bold"
        />
        <div className="flex gap-2">
          {labels.map((label, i) => {
            return (
              <div
                key={i}
                className={`px-2 flex items-center rounded-md bg-white/30
                ${
                  latestLabelHighlighted &&
                  i === labels.length - 1 &&
                  "bg-white/60"
                }
                `}
              >
                <BookmarkSimple
                  className="mr-1"
                  size={16}
                  color="#fcf8f8"
                  weight="fill"
                />

                {label}
              </div>
            );
          })}
        </div>
        <input
          ref={inputRef}
          className={`bg-transparent px-2 flex-1 focus:outline-none
          ${latestLabelHighlighted && " caret-transparent"}`}
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.currentTarget.value);
          }}
        />
      </div>
    </div>
  );
};

const SearchBar = connectSearchBox(Searcher);

export default SearchBar;
