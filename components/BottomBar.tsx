import React from "react";
import ProfileTab from "./ProfileTab";
import SearchBar from "./SearchBar";

type Props = {};

const BottomBar = (props: Props) => {
  return (
    <div className="fixed w-full bottom-10 flex items-end">
      <div className="w-1/4" />
      <SearchBar />
      <ProfileTab />
    </div>
  );
};

export default BottomBar;
