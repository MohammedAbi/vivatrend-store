import React from "react";

const DividerWithText: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-center relative py-2 mb-4">
      <div className="w-full h-[1px] bg-black/40"></div>
      <span className="absolute text-lg text-black/80 bg-white px-2">Or</span>
    </div>
  );
};

export default DividerWithText;
