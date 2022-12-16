import React from "react";
import { SearchBox, connectSearchBox } from "react-instantsearch-dom";
import { MagnifyingGlass } from "phosphor-react";
const Searcher = ({ currentRefinement, refine }) => {
  return (
    <div className="fixed w-full bottom-10">
      <div className="relative w-1/3 mx-auto">
        <MagnifyingGlass
          className="absolute top-0 bottom-0 my-auto left-2 z-10"
          size={20}
          color="#fcf8f8"
          weight="bold"
        />
        <input
          className="bg-black/30 w-full shadow-lg font-silkRegular focus:outline-none border-[0.05rem] border-gray-200 border-opacity-30 backdrop-blur-md rounded-xl py-2 pr-4 pl-10"
          type="search"
          value={currentRefinement}
          onChange={(event) => refine(event.currentTarget.value)}
        />
      </div>
    </div>
  );
};

const SearchBar = connectSearchBox(Searcher);

export default SearchBar;
