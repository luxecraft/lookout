import { ArrowSquareUp } from "phosphor-react";
import React, { useEffect, useState } from "react";

type Props = {};

const ScrollUpBtn = (props: Props) => {
  const [showingScrollUpBtn, setShowingScrollUpBtn] = useState(false);

  const listener = () => {
    if (window.pageYOffset > 1000) {
      setShowingScrollUpBtn(true);
    } else {
      setShowingScrollUpBtn(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  return (
    <div className="w-1/4">
      {showingScrollUpBtn && (
        <div
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          className="p-2 scrollUpBtn cursor-pointer max-w-fit mx-auto bg-white/30 dark:bg-black/30 shadow-lg font-silk border-[0.05rem] border-gray-200 border-opacity-30 backdrop-blur-md rounded-xl"
        >
          <ArrowSquareUp
            size={24}
            className="text-black dark:text-white"
            weight="fill"
          />
        </div>
      )}
    </div>
  );
};

export default ScrollUpBtn;
