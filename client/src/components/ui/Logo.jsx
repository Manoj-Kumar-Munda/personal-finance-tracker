import React from "react";
import { IoWalletOutline } from "react-icons/io5";

const Logo = () => {
  return (
    <div>
      <div className="inline-flex items-center gap-2">
        <IoWalletOutline size={35} color="#6C63FF" />
        <h1 className="text-2xl drop-shadow-lg font-black  text-primary font-Poppins cursor-pointer">
          FinTrack
        </h1>
      </div>
    </div>
  );
};

export default Logo;
