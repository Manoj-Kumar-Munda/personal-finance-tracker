import React, { useEffect, useState } from "react";
import DoughnutChart from "../../components/Charts/DoughnutChart";
import { useSelector } from "react-redux";
import Button from "../../components/form/Button";
import ModifyBudgets from "./ModifyBudgets";
import NoBudget from "../../assets/ui/E-Wallet-bro.svg";
import Heading from "../../components/ui/Heading";

const ExistingBudgets = () => {
  const budgets = useSelector((store) => store.budget.currentBudgets);
  const [isShowAll, setIsShowAll] = useState(false);
  const [isMakeChanges, setIsmakeChanges] = useState(false);


  return (
    <>
      <h1 className="text-5xl font-Maven-Pro font-bold text-slate-800 ">
        <span className="text-primary">Budgets</span> for this month
      </h1>

      <div className="my-6  sm:px-4">
        <div className="flex flex-wrap justify-center relative">
          {budgets.length === 0 ? (
            <div>
              <div>
                <img src={NoBudget} className="w-full" />
              </div>
              <Heading className="font-Poppins">No budget created!!</Heading>

            </div>
          ) : (budgets.length < 4 || isShowAll) ? (
            budgets.map((budget) => (
              <DoughnutChart
                key={budget._id}
                id={budget._id}
                chartLabel={budget.category}
                datasetLabel={"amount"}
                dataArr={[budget.spentAmount, budget.remainingAmount]}
                showDetail={true}
              />
            ))
          ) : (
            budgets
              .slice(0, 3)
              .map((budget) => (
                <DoughnutChart
                  key={budget._id}
                  id={budget._id}
                  chartLabel={budget.category}
                  datasetLabel={"Budget analysis"}
                  dataArr={[budget.spentAmount, budget.remainingAmount]}
                  showDetail={true}
                />
              ))
          )}
        </div>
        <div className=" my-3 sm:my-0 relative flex flex-col sm:flex-row justify-start sm:justify-end gap-2">
          {budgets.length > 3 && (
            <Button
              className="font-Poppins"
              onClick={() => setIsShowAll((prev) => !prev)}
            >
              { isShowAll ? "Show Less" : "Show More" }
            </Button>
          )}

          {budgets.length > 0 && (
            <Button
              className="font-Poppins bg-red-500"
              onClick={() => setIsmakeChanges(true)}
            >
              Make Changes
            </Button>
          )}
        </div>

        <div className="">
          {isMakeChanges && budgets.length>0 && <ModifyBudgets budgets={budgets} />}
          
        </div>
      </div>
    </>
  );
};

export default ExistingBudgets;
