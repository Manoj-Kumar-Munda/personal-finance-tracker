import React from "react";
import Heading from "../../components/ui/Heading";
import about from "../../assets/about.jpg";

const AboutUs = () => {
  return (
    <section className=" max-w-screen-xl w-full mx-auto my-4">
      <div className="space-y-4">
        <div>
          <Heading className="text-primary text-center text-5xl ">
            About Us
          </Heading>

          <p className="font-Poppins font-normal py-6">
            At FinanceTrack, we believe that everyone deserves financial
            empowerment and peace of mind. Founded in 2023, our mission is to
            provide individuals with the tools and resources they need to take
            control of their finances, set achievable goals, and build a secure
            financial future.
          </p>

          <div className="rounded-lg w-full md:w-2/3 mx-auto overflow-hidden">
            <img src={about} className="w-full h-auto object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
