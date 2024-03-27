import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { budgetFormValidation } from "../../utils/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/form/Input";
import ErrorMessge from "../../components/form/ErrorMessge";
import Button from "../../components/form/Button";
import { useDispatch, useSelector } from "react-redux";
import { axiosConfig } from "../../utils/axios/axiosConfig";
import { updateBudget } from "../../utils/slices/budgetSlice";

const EditBudgets = () => {
  const dispatch = useDispatch();
  const budgets = useSelector((store) => store.budget.currentBudgets);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const onChangeSelectCategory = (e) => {
    const activeCategory = JSON.parse(e.target.value);
    setSelectedCategory(activeCategory);
  };

  useEffect(() => {
    selectedCategory && setValue("budgetAmount", selectedCategory.budgetAmount);
  }, [selectedCategory]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(budgetFormValidation),
  });

  const onSubmitHandler = async (data, e) => {
    const budgetData = {
      newBudgetAmount: data.budgetAmount,
      ...JSON.parse(data.category),
    };
    console.log("data", budgetData);
    try {
      const res = await axiosConfig.patch("/api/v1/budget/modify", budgetData);
      dispatch(updateBudget(res.data.data));
      e.target.reset();
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <div>
      <h1 className="text-5xl font-Maven-Pro font-bold text-slate-800 ">
        Edit <span className="text-primary">Budget</span>
      </h1>

      <div className="max-w-screen-sm my-4 shadow-xl  rounded-2xl px-4 py-6 ">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="flex flex-col gap-4 mb-4">
            <select
              className="border py-3 px-2 rounded-lg outline-none transition-all focus:ring-2 focus:ring-primary"
              defaultValue={"Select Category"}
              {...register("category", {
                onChange: (e) => {
                  onChangeSelectCategory(e);
                },
              })}
            >
              <option value="Select Category" disabled>
                Select category
              </option>
              {budgets.map((budget) => (
                <option key={budget._id} value={JSON.stringify(budget)}>
                  {budget.category}
                </option>
              ))}
            </select>
            <Input
              label="Amount"
              type="number"
              name="budgetAmount"
              {...register("budgetAmount")}
            />

            {errors.budgetAmount && (
              <ErrorMessge>{errors.budgetAmount.message}</ErrorMessge>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              className="transition-colors hover:bg-primary/80"
              type="submit"
            >
              Modify
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBudgets;
