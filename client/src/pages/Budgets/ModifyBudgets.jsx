import React from "react";
import EditBudgets from "./EditBudgets";
import RemoveBudget from "./RemoveBudget";

const ModifyBudgets = () => {
  return (
    <div className="flex justify-between flex-wrap">
      <EditBudgets />
      <RemoveBudget />
    </div>
  );
};

export default ModifyBudgets;
