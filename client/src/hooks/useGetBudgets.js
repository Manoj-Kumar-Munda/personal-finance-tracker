import { axiosConfig } from "../utils/axios/axiosConfig";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addBudgets } from "../utils/slices/budgetSlice";

export const useFetchBudgetCategories = () => {
  const dispatch = useDispatch();

  const fetchBudgets = async () => {
    const res = await axiosConfig.get("/api/v1/users/budget-categories");
    dispatch(addBudgets(res?.data?.data));
  };

  useEffect(() => {
    fetchBudgets();
  }, []);
};
