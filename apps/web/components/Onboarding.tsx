import React from "react";

type Props = {
  setHasOnboarded: (hasOnboarded: boolean) => void;
};

const Onboarding = (props: Props) => {
  const { setHasOnboarded } = props;
  return (
    <div className="text-black z-50 text-center md:w-2/5 dark:text-white font-silk onboarding-card">
      <h1 className="text-xl md:text-3xl xl:text-5xl">Lookout 👀</h1>
      <p className="text-gray-600 text-xs md:text-base mt-4">
        A new way to look at images
      </p>

      <ul className="dark:text-gray-400 space-y-4 text-gray-800 mt-8 text-xs text-justify md:text-base">
        <li>
          {">"} Search through images using keywords or tags or vibes that you
          need.
        </li>
        <li>
          {">"} You can also search for textual data that can be found inside
          the images.
        </li>
        <li>
          {">"} We have populated hundreds of thousands of images for you to
          explore.
        </li>
        <li>
          {">"} The most exciting part is that you can upload your own images
          and have them processed to brand it with tags and keywords!
        </li>
        <li className="text-center text-xl pt-5">Happy searching!</li>
      </ul>
      <button
        onClick={() => {
          setHasOnboarded(true);
          localStorage.setItem("hasOnboarded", "true");
        }}
        className="mt-10 font-silk w-full md:w-1/2 gradient-btn duration-300 text-white rounded-lg px-1 py-3 md:p-2 shadow-lg"
      >
        Explore Now
      </button>
    </div>
  );
};

export default Onboarding;
