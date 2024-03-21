import React from "react";
import heroBg from "../../assets/ui/hero-bg.svg";

const Hero = () => {
  return (
    <section className="max-w-screen-2xl mx-auto">
      <div className="py-8">
        <div className="h-full flex justify-center items-center flex-wrap px-4">
          <div className="font-Poppins basis-2/5  grow flex flex-col  justify-center text-start gap-4 min-w-96">
            <h1 className="text-5xl md:text-6xl font-bold text-[#6C63FF] py-4">
              Track your expenses with us.
            </h1>

            <p className="line-clamp-4 text-gray-500 leading-7">
              Take control of your finances effortlessly with FinanceTrack – the
              ultimate solution for managing your money with ease and precision.
              Whether you're a seasoned investor or just starting your financial
              journey, our intuitive app empowers you to make informed
              decisions.
            </p>
          </div>
          <div className="basis-3/5 grow">
            <img src={heroBg} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
