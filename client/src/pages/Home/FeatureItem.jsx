import React from "react";
import Heading from "../../components/ui/Heading";

const FeatureItem = ({
  children,
  number = "",
  title = "",
}) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <h1 className=" basis-28 lg:basis-32 self-start font-extrabold text-center outlined-number text-8xl lg:text-9xl">
        {number}
      </h1>
      <div className="space-y-4 basis-full">
        <Heading className="text-white md:text-4xl lg:text-5xl text-start">
          {title}
        </Heading>
        <p className="text-[#C2D9FF] font-Poppins">
          {children}
        </p>
      </div>
    </div>
  );
};

export default FeatureItem;
