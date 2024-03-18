import React from "react";
import { TiTickOutline } from "react-icons/ti";

const SuccessMessage = ({children}) => {
  return (
    <p className="flex items-center text-green-700 font-Poppins text-sm">
      <TiTickOutline /> {children}
    </p>
  );
};

export default SuccessMessage;
