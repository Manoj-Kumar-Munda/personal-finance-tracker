import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";

const BudgetInfo = () => {
  const { budgetId } = useParams();
  const { data, loading, error } = useAxios(`/api/v1/budget/${budgetId}`);
  const { data:expenses , loading:expenseLoading, error:expenseError } = useAxios(`/api/v1/budget/${budgetId}/expenses`, budgetId);

  if(expenses){
    console.log("Expenses: ", expenses);
  }
  if(expenseError){
    console.log("Expense error: ", expenseError);
  }

  if (data) {
    console.log("Data: ", data);
  }

  if (loading) {
    return <h1>Loading...</h1>
  }
  if (error) {
    console.log("Error: ", error);
  }

  return <div>BudgetInfo</div>;
};

export default BudgetInfo;
