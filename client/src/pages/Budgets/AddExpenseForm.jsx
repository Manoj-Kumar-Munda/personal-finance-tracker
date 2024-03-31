import React, { useState } from "react";
import SelectCategory from "../../components/form/Select";
import Button from "../../components/form/Button";
import { useDispatch, useSelector } from "react-redux";
import Heading from "../../components/ui/Heading";
import Input from "../../components/form/Input";
import { axiosConfig } from "../../utils/axios/axiosConfig";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { budgetFormValidation } from "../../utils/validationSchema";
import ErrorMessge from "../../components/form/ErrorMessge";
import toast, { Toaster } from "react-hot-toast";
import { updateBudget } from "../../utils/slices/budgetSlice";

const AddExpenseForm = () => {
  const categories = useSelector((store) => store.budget.currentBudgets);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(budgetFormValidation),
  });

  const addExpenseHandler = async (data, e) => {
    setIsLoading(true);
    const body = {
      category: JSON.parse(data.category),
      paidAmount: data.budgetAmount,
    };
    try {
      const res = await axiosConfig.post("/api/v1/expense/add", body);

      const { updatedBudget } = res.data.data;
      console.log("updatedBudget ", updatedBudget);

      toast.success("Expense added");
      setIsLoading(false);
      dispatch(updateBudget(updatedBudget));
      e.target.reset();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error(error?.response?.data.message);
    }
  };

  if (categories.length === 0) {
    return null;
  }
  return (
    <div className="flex-grow basis-auto min-w-96">
      <Toaster />
      <Heading
        className="font-bold text-slate-800"
        font="font-Maven-Pro"
        textSize="text-5xl"
      >
        <span className="text-primary">Add</span> Expense
      </Heading>

      <div className="max-w-screen-sm my-4 shadow-xl rounded-2xl px-4 py-6">
        <form className="" onSubmit={handleSubmit(addExpenseHandler)}>
          <div className="flex flex-col gap-6 mb-4">
            <SelectCategory options={categories} {...register("category")} />

            <Input
              label="*Amount"
              type="number"
              name="budgetAmount"
              {...register("budgetAmount")}
            />

            {errors.budgetAmount && (
              <ErrorMessge>{errors.budgetAmount.message}</ErrorMessge>
            )}
            <Button
              className="transition-all bg-teal-500 hover:bg-teal-400"
              disabled={isLoading}
            >
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseForm;
