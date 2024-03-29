import { axiosConfig } from "../utils/axios/axiosConfig";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addBudgets } from "../utils/slices/budgetSlice";
import { logout } from "../utils/slices/authSlice";

export const useFetchBudgetCategories = () => {
  const dispatch = useDispatch();

  const fetchBudgets = async () => {
    try{
      const res = await axiosConfig.get("/api/v1/users/budget-categories");
      dispatch(addBudgets(res?.data?.data));
    } catch(error){
      console.log("error: ", error)
      if(error?.response?.data?.statusCode === 401){
        dispatch(logout());
      }
    }
  }

  useEffect(() => {
    fetchBudgets();
  }, []);
};
