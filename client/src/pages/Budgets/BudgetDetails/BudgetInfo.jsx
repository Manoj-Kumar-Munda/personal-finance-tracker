import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import DoughnutChart from "../../../components/Charts/DoughnutChart";
import Heading from "../../../components/ui/Heading";
import AddExpenseForm from "../AddExpenseForm";
import Button from "../../../components/form/Button";
import Header from "../../../components/ui/Header";
import Table from "../../../components/Table";
import { dateToString } from "../../../utils/helpers";
import ProgressBar from "../../../components/form/ProgressBar";
import NoExpense from "../../../assets/ui/no-expense.svg";

const BudgetInfo = () => {
  const { budgetId } = useParams();
  const {
    data: budget,
    loading,
    error,
  } = useAxios(`/api/v1/budget/${budgetId}`);
  const {
    data: expenses,
    loading: expenseLoading,
    error: expenseError,
  } = useAxios(`/api/v1/budget/${budgetId}/expenses`, budgetId);

 
  if (expenseError) {
    console.log("Expense error: ", expenseError);
  }

  if (budget) {
    console.log("Data: ", budget);
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    console.log("Error: ", error);
  }

  return (
    <div className="my-4 px-2 sm:px-4 ">
      <div className="flex justify-start flex-wrap gap-y-4">
        <div className="flex-grow basis-1/3">
          <Heading className="font-Maven-Pro text-5xl my-4">
            <span className="text-red-600">{budget.category}</span> overview
          </Heading>

          <div className="sm:pl-4">
            <div className="w-full mx-auto max-w-80">
              <DoughnutChart
                id={budget._id}
                chartLabel={budget.category}
                datasetLabel={"amount"}
                dataArr={[budget.spentAmount, budget.remainingAmount]}
                datasetBgColorsArr={["#f9a8d4", "#dc2626"]}
              />
            </div>

            <div className="my-4">
              <div className="font-Maven-Pro flex flex-col gap-2">
                <div>
                  <span className="text-xl font-semibold">Category: </span>
                  <span className="font-Poppins text-red-500">
                    {budget.category}
                  </span>
                </div>
                <div>
                  <span className="text-xl font-semibold">Created On: </span>
                  <span className="font-Poppins">
                    {dateToString(budget.date)}
                  </span>
                </div>

                <div>
                  <span className="text-xl font-semibold">Budget amount: </span>
                  <span className="font-Poppins">
                    &#8377;{budget.budgetAmount}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-xl font-semibold">Total Spent</span>
                  <div>
                    <span className="font-Poppins font-semibold">
                      &#8377;{budget.spentAmount}
                    </span>
                    <ProgressBar
                      progressPercentage={parseInt(
                        (budget.spentAmount / budget.budgetAmount) * 100
                      )}
                      colors={["bg-sky-500", "bg-red-500"]}
                    />
                  </div>
                </div>
                <div>
                  <span className="text-xl font-semibold">Budget left: </span>
                  <div>
                    <span className="font-Poppins font-semibold">
                      &#8377;{budget.remainingAmount}
                    </span>
                    <ProgressBar
                      progressPercentage={parseInt(
                        (budget.remainingAmount / budget.budgetAmount) * 100
                      )}
                      colors={["bg-rose-500", "bg-orange-500"]}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full text-center space-y-3 my-4">
              <Button className=" bg-red-500">Delete</Button>
            </div>
          </div>
        </div>

        <div className=" basis-2/3 flex-grow w-full">
          <Heading className="text-red-400">
            Expenses <span className="text-slate-800">Details</span>
          </Heading>

          <div className="my-4 w-full ">
            {expenses.length === 0 ? (
              <div className="relative min-h-40 w-full flex flex-col items-center justify-center">
                <div className="realtive w-1/2">
                  <img src={NoExpense} className="" />
                </div>
                <Heading className="text-lg sm:text-xl font-Poppins text-slate-700">
                  You haven't spent in this category
                </Heading>
              </div>
            ) : (
              <div className="relative overflow-x-auto">
                <Table expenses={expenses} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetInfo;
