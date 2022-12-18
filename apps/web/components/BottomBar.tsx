import React from "react";
import ProfileTab from "./ProfileTab";
import ScrollUpBtn from "./ScrollUpBtn";
import SearchBar from "./SearchBar";

type Props = {};

const BottomBar = (props: Props) => {
  return (
    <div className="fixed w-full bottom-10 flex items-end">
      <ScrollUpBtn />
      <SearchBar />
    </div>
  );
};

export default BottomBar;
