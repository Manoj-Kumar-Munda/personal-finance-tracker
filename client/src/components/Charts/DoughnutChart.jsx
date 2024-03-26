import React from "react";
import { Doughnut } from "react-chartjs-2";
import { getDoughnutData } from "../../utils/helpers";

const DoughnutChart = ({
  chartLabel,
  labelsArr = ["Spent amount", "remainingAmount"],
  datasetLabel,
  datasetBgColorsArr = ["rgb(0,0,255)", "rgb(102,102,255)"],
  dataArr,
}) => {
  const data = getDoughnutData({
    labelsArr,
    datasetLabel,
    datasetBgColorsArr,
    dataArr,
  });

  console.log("Data: ", data);
  return (
    <div>
      <div className="">
        <Doughnut data={data} />
        <h2 className="text-center font-Poppins">{chartLabel}</h2>
      </div>
    </div>
  );
};

export default DoughnutChart;
