import React from "react";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import { useForm } from "react-hook-form";
import { budgetFormValidation } from "../../utils/validationSchema";
import ErrorMessge from "../../components/form/ErrorMessge";
import { yupResolver } from "@hookform/resolvers/yup";
import { axiosConfig } from "../../utils/axios/axiosConfig";
import { useDispatch } from "react-redux";
import { addNewBudget } from "../../utils/slices/budgetSlice";

const AddBudgetForm = () => {
  const dispatch = useDispatch();
  const onSubmitHandler = async (budgetData, e) => {

    try {
      const res = await axiosConfig.post(
        "/api/v1/budget/add-budget",
        budgetData
      );
      e.target.reset();

      dispatch(addNewBudget(res?.data?.data));
    } catch (error) {

      if (error?.response) {
        setError(error?.response.data.message);
      } else {
        setError(error?.message);
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(budgetFormValidation),
  });
  return (
    <div className="flex-grow basis-auto min-w-96">
      <h1 className="text-5xl font-Maven-Pro font-bold text-slate-800 ">
        Add <span className="text-primary">Budget</span>
      </h1>

      <div className="max-w-screen-sm my-4 shadow-xl  rounded-2xl px-4 py-6 ">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="flex flex-col gap-4 mb-4">
            <Input
              label="Budget Category"
              placeholder="e.g. Food, Travel, Health, etc."
              name="category"
              {...register("category")}
            />

            <Input
              label="Amount"
              placeholder=""
              type="number"
              name="budgetAmount"
              defaultValue={0}
              {...register("budgetAmount")}
            />

            {errors.budgetAmount && (
              <ErrorMessge>{errors.budgetAmount.message}</ErrorMessge>
            )}
          </div>

          <Button className="transition-colors hover:bg-primary/80">
            Add Budget
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddBudgetForm;
