import React from "react";
import Hero from "./Hero";
import Heading from "../../components/ui/Heading";
import FeatureItem from "./FeatureItem";
import AboutUs from "./AboutUs";
import Footer from "../../components/ui/Footer";
const Home = () => {
  return (
    <div className="relative">
      <Hero />

      <section className="my-4 md:my-8 bg-violet-800 py-6">
        <Heading className="text-center text-white py-4 text-5xl">
          Features
        </Heading>

        <div className="my-6 sm:px-4 max-w-screen-xl w-full mx-auto space-y-4">
          <FeatureItem number="1" title="Plan your budgets">
            Craft personalized budget plans tailored to your lifestyle and
            financial goals. With FinanceTrack, you can easily allocate funds to
            various categories, whether it's groceries, entertainment, bills, or
            savings. Our user-friendly interface makes it simple to set
            realistic spending limits and stay on track.
          </FeatureItem>

          <FeatureItem number="2" title="Track your expense">
            Say goodbye to financial guesswork! FinanceTrack enables you to
            effortlessly track every expense, from a morning coffee to a major
            purchase. By logging your transactions in real-time, you gain
            invaluable insights into your spending habits, helping you identify
            areas for improvement and make smarter financial decisions.
          </FeatureItem>

          <FeatureItem number="3" title="Categorize your budgets">
            Organize your finances like a pro by categorizing your budgets with
            FinanceTrack. Whether it's essentials like housing and utilities or
            discretionary spending like dining out and travel, our app allows
            you to categorize expenses with ease. This granular approach gives
            you a clear overview of where your money is going, empowering you to
            prioritize spending and achieve your financial objectives.
          </FeatureItem>
        </div>
      </section>

      <AboutUs />
      <Footer />
    </div>
  );
};

export default Home;
