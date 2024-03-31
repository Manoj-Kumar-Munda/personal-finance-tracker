import React from "react";
import Chart from "chart.js/auto";
import { Doughnut, Pie } from "react-chartjs-2";

const labels = ["Food", "Transport", "Utilities", "Others"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(51, 255, 153)",
        "rgb(0,0,255)",
        "rgb(102,102,255)",
      ],
      borderColor: "rgb(255, 255, 255)",
      data: [3000, 2000, 5000, 4000],
    },
  ],
};

const doughnutData = {
  labels: ["Spent amount", "Remaining amount"],
  datasets: [
    {
      label: "amount",
      backgroundColor: ["rgb(0,0,255)", "rgb(102,102,255)"],
      data: [5000, 1300],
    },
  ],
};

const MonthOverview = () => {
  return (
    <div className="flex flex-wrap justify-between">
      <div className="basis-1/4 w-ful mx-auto">
        <div className="w-full max-w-96">
          <Doughnut width={"full"} data={data} />
          <h1 className="text-center font-Poppins font-semibold py-1 text-lg ">
            Budget Plan for <span className="text-primary">March</span>
          </h1>
        </div>
      </div>

      <div className="grow flex justify-center flex-wrap">
        <div className="">
          <Doughnut data={doughnutData} />
          <h1 className="text-center font-Poppins font-semibold">Food</h1>
        </div>

        <div className="">
          <Doughnut data={doughnutData} />
          <h1 className="text-center font-Poppins font-semibold">Transport</h1>
        </div>

        <div className="">
          <Doughnut data={doughnutData} />
          <h1 className="text-center font-Poppins font-semibold">Utilities</h1>
        </div>

        <div className="">
          <Doughnut data={doughnutData} />
          <h1 className="text-center font-Poppins font-semibold">Others</h1>
        </div>
      </div>
    </div>
  );
};

export default MonthOverview;
