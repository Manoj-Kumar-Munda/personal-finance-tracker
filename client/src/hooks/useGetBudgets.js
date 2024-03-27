import { useQuery } from "@tanstack/react-query";
import { axiosConfig } from "../utils/axios/axiosConfig";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addBudgets } from "../utils/slices/budgetSlice";

export const useFetchBudgetCategories = () => {
  const dispatch = useDispatch();

  const fetchBudgets = async () => {
    const res = await axiosConfig.get("/api/v1/users/budget-categories");

    console.log("response: ", res?.data?.data);
    dispatch(addBudgets(res?.data?.data));
  };

  useEffect(() => {
    fetchBudgets();
  }, []);
};
