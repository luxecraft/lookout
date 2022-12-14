import React, { useEffect, useState } from "react";

const BlurryCircle = () => {
  return (
    <div className="w-screen flex justify-center">
      <div className="rounded-full h-[700px] w-screen lg:w-[600px] transition-colors duration-1000 bg-teal-400 blur-[300px] fixed bottom-[-30rem] blurry-circle"></div>
    </div>
  );
};

export default BlurryCircle;
