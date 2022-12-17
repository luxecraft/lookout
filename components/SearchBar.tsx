import React, { useEffect, useRef, useState } from "react";
import { SearchBox, connectSearchBox } from "react-instantsearch-dom";
import { BookmarkSimple, Cube, MagnifyingGlass } from "phosphor-react";
const Searcher = ({ currentRefinement, refine }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [labels, setLabels] = useState<string[]>([]);
  const [latestLabelHighlighted, setLatestLabelHighlighted] = useState(false);

  const [searchBarText, setSearchBarText] = useState("");

  useEffect(() => {
    const listener = (e) => {
      if ((e.key === "Tab" || e.keyCode === 32) && searchBarText !== "") {
        setLabels([...labels, searchBarText]);
        setSearchBarText("");
      }

      if (e.key === "Backspace" && searchBarText === "") {
        if (latestLabelHighlighted) {
          setLabels(labels.slice(0, -1));
          setQuery(query.split(" ").slice(0, -1).join(" "));
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
  }, [searchBarText, labels, latestLabelHighlighted]);

  useEffect(() => {
    if (labels.length === 0) {
      setQuery(searchBarText.trim());
    } else {
      setQuery((labels.join(" ") + " " + searchBarText).trim());
    }
  }, [searchBarText, refine]);

  useEffect(() => {
    console.log('"', query, '"');
  }, [query]);

  useEffect(() => {
    refine(query);
  }, [query]);

  return (
    <div className="relative flex  py-2 dark:text-white text-black overflow-scroll items-center justify-start px-4 w-1/2 mx-auto bg-white/30 dark:bg-black/30 shadow-lg font-silk border-[0.05rem] border-gray-200 border-opacity-30 backdrop-blur-md rounded-xl">
      <MagnifyingGlass
        className="mr-2 text-black dark:text-white"
        size={20}
        weight="bold"
      />
      <div className="flex gap-2">
        {labels.map((label, i) => {
          return (
            <div
              key={i}
              className={`px-2 flex items-center rounded-md dark:bg-black/30 bg-white/30
                ${
                  latestLabelHighlighted &&
                  i === labels.length - 1 &&
                  "bg-white/60 dark:bg-black/60"
                }
                `}
            >
              <BookmarkSimple
                className="mr-1 text-black dark:text-white"
                size={16}
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
        value={searchBarText}
        onChange={(event) => {
          setSearchBarText(event.currentTarget.value);
        }}
      />
    </div>
  );
};

const SearchBar = connectSearchBox(Searcher);

export default SearchBar;
