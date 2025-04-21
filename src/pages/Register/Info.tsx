import React from "react";
import Img1 from "../../assets/images/background.jpg";

const Info: React.FC = () => {
  return (
    <div className="relative lg:w-1/2 hidden lg:flex h-[calc(100vh-90px)]">
      <div className="absolute top-[20%] left-[10%] flex flex-col max-w-[80%]">
        <h1 className="text-4xl text-white font-bold my-4 leading-tight">
          Join the VivaTrend Community
        </h1>
        <p className="text-xl text-white font-normal mb-6">
          Create your account and unlock exclusive benefits
        </p>
        <ul className="space-y-3 text-white/90">
          <li className="flex items-center">
            <span className="mr-2">✓</span> Early access to new collections
          </li>
          <li className="flex items-center">
            <span className="mr-2">✓</span> Member-only discounts
          </li>
          <li className="flex items-center">
            <span className="mr-2">✓</span> Personalized style recommendations
          </li>
        </ul>
      </div>
      <img
        src={Img1}
        alt="Fashionable people enjoying VivaTrend clothing"
        className="w-full h-full object-cover"
      />
      <div className="absolute w-full h-full bg-black/50 z-10 pointer-events-none"></div>
    </div>
  );
};

export default Info;