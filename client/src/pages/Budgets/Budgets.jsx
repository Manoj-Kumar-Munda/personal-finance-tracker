import React from "react";
import AddBudgetForm from "./AddBudgetForm";
import ExistingBudgets from "./ExistingBudgets";
import { useFetchBudgetCategories } from "../../hooks/useGetBudgets";
import AddExpenseForm from "./AddExpenseForm";

const Budgets = () => {
  useFetchBudgetCategories();

  return (
    <div className="px-2 sm:px-4 my-4">
      <div className="flex justify-between">
        <AddBudgetForm />
        <AddExpenseForm />
      </div>
      <ExistingBudgets />
    </div>
  );
};

export default Budgets;
