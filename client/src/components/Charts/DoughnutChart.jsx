import React from "react";
import { Doughnut } from "react-chartjs-2";
import { getDoughnutData } from "../../utils/helpers";
import Button from "../form/Button";
import { Link } from "react-router-dom";

const DoughnutChart = ({
  id,
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


  return (
    <div>
      <div className="text-center">
        <Doughnut data={data} />
        <h2 className="text-center font-Poppins">{chartLabel}</h2>
        <Button className=""><Link to={`/budgets/${id}`}>View Details</Link></Button>
      </div>
    </div>
  );
};

export default DoughnutChart;
