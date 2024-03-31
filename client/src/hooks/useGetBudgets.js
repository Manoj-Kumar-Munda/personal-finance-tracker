import { axiosConfig } from "../utils/axios/axiosConfig";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addBudgets } from "../utils/slices/budgetSlice";
import { logout } from "../utils/slices/authSlice";

export const useFetchBudgetCategories = () => {
  const [error, setError] = useState(null);
  const [ isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchBudgets = async () => {
    try{
      const res = await axiosConfig.get("/api/v1/users/budget-categories");
      dispatch(addBudgets(res?.data?.data));
      setIsLoading(false);
      setError(null);
    } catch(error){
      setIsLoading(false);
      console.log("error: ", error)
      setError(error?.response.data.message);
      if(error?.response?.data?.statusCode === 401){
        dispatch(logout());
      }
    }
  }

  useEffect(() => {
    fetchBudgets();
  }, []);

  return { error, isLoading }
};
