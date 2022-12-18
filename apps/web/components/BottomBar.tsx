import React from "react";
import ProfileTab from "./ProfileTab";
import ScrollUpBtn from "./ScrollUpBtn";
import SearchBar from "./SearchBar";
import Stats from "./Stats";

type Props = {};

const BottomBar = (props: Props) => {
  return (
    <div className="fixed w-full bottom-10 flex items-end">
      <div className="fixed p-2 h-10 text-black text-center dark:text-white w-1/2 lg:w-1/4 left-0 right-0 mx-auto bottom-2 bg-white/30 dark:bg-black/30 shadow-lg font-silk border-[0.05rem] border-gray-200 border-opacity-30 backdrop-blur-md rounded-xl">
        <Stats />
      </div>
      <ScrollUpBtn />
      <SearchBar />
    </div>
  );
};

export default BottomBar;
