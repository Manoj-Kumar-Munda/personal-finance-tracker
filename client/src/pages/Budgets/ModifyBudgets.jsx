import React from "react";
import EditBudgets from "./EditBudgets";
import RemoveBudget from "./RemoveBudget";

const ModifyBudgets = () => {
  return (
    <div className="flex justify-between gap-3 flex-wrap my-4">
      <EditBudgets />
      <RemoveBudget />
    </div>
  );
};

export default ModifyBudgets;