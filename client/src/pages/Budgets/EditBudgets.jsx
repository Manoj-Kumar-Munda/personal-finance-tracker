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
import SelectCategory from "../../components/form/Select";
import Heading from "../../components/ui/Heading";

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
    try {
      const res = await axiosConfig.patch("/api/v1/budget/modify", budgetData);
      dispatch(updateBudget(res.data.data));
      e.target.reset();
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <div className="flex-grow basis-auto">
      <Heading
        className="font-bold text-slate-800"
        font="font-Maven-Pro"
        textSize="text-5xl"
      >
        <span className="text-primary">Edit</span> Budget
      </Heading>

      <div className="max-w-screen-sm my-4 shadow-xl  rounded-2xl px-4 py-6 ">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="flex flex-col gap-4 mb-4">
            <SelectCategory
              options={budgets}
              defaultValue={"Select category"}
              {...register("category", {
                onChange: (e) => {
                  onChangeSelectCategory(e);
                },
              })}
            />

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
