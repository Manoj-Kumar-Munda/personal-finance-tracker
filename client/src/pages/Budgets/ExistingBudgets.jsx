import React, { useEffect, useState } from "react";
import { axiosConfig } from "../../utils/axios/axiosConfig";
import DoughnutChart from "../../components/Charts/DoughnutChart";
import { useSelector } from "react-redux";
import store from "../../utils/store";

const ExistingBudgets = () => {
  // const [error, setError] = useState(null);
  // const [budgets, setBudgets] = useState([]);
  
  const budgets = useSelector( store => store.budget.currentBudgets);
  console.log("Budgets : ", budgets);

  return (
    <>
      <h1 className="text-5xl font-Maven-Pro font-bold text-slate-800 ">
        <span className="text-primary">Budgets</span> for this month
      </h1>

      <div className="my-6">
        <div className="flex flex-wrap">
          {budgets.length === 0 ? (
            <h1>Loading...</h1>
          ) : (
            budgets.map((budget) => (
              <DoughnutChart
                key={budget._id}
                chartLabel={budget.category}
                datasetLabel={"Budget analysis"}
                dataArr={[budget.spentAmount, budget.remainingAmount]}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ExistingBudgets;
