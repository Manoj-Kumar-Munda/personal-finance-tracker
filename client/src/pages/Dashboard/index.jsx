import React from "react";
import MonthOverview from "./MonthOverview";
import LineChart from "./LindeChart";
import BarChart from "./BarChart";
import LineChart2 from "./LineChart2";

const Dashboard = () => {
  return (
    <section className="px-4 my-4">
      <div className="py-2 border-b-2">
        <h1 className="font-Maven-Pro text-3xl font-bold">
          Welcome back, <span className="text-primary">Manoj</span>
        </h1>
      </div>
      <div className="py-4">
        <h1 className="font-Maven-Pro text-2xl font-semibold">This month</h1>
      </div>

      <div className="max-w-screen-xl mx-auto w-full">
        <MonthOverview />
        
      </div>

      <div className="my-8">
        <h1 className="font-Maven-Pro text-3xl font-bold">
          Monthly expense overview
        </h1>
      </div>

      <div className="max-w-screen-xl mx-auto w-full">
        <div className="max-w-screen-md mx-auto">
          <LineChart />
          <BarChart />

          <LineChart2 />

        </div>
      </div>


    </section>
  );
};

export default Dashboard;
