import React, { useEffect, useState } from "react";
import { axiosConfig } from "../../utils/axios/axiosConfig";

const ExistingBudgets = () => {
  const [error, setError] = useState(null);
  const fetchCurrentBudgets = async () => {
    try {
      const res = await axiosConfig.get("/api/v1/users/budget-categories");
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchCurrentBudgets();
  }, []);
  return (
    <>
      <h1 className="text-5xl font-Maven-Pro font-bold text-slate-800 ">
        <span className="text-primary">Budgets</span> for this month
      </h1>

      <div></div>
    </>
  );
};

export default ExistingBudgets;
