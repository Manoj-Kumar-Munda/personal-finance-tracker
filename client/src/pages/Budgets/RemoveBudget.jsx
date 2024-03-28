import React, { useEffect, useState } from "react";
import Heading from "../../components/ui/Heading";
import SelectCategory from "../../components/form/Select";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "../../components/form/ProgressBar";
import Button from "../../components/form/Button";
import { axiosConfig } from "../../utils/axios/axiosConfig";
import { removeBudget } from "../../utils/slices/budgetSlice";

const RemoveBudget = () => {
  const dispatch = useDispatch();
  const categories = useSelector((store) => store.budget.currentBudgets);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    const percent = parseInt(
      (activeCategory.spentAmount / activeCategory.remainingAmount) * 100
    );
    setProgressPercentage(percent);
  }, [activeCategory]);

  const deleteBudgetHandler = async (e) => {
    setIsLoading(true);
    console.log("active: ", activeCategory);
    e.preventDefault();
    try {
      const res = await axiosConfig.delete(
        `/api/v1/budget/${activeCategory._id}`
      );

      console.log("repsonse", res.data.data)
      dispatch(removeBudget(res.data.data))

      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-grow basis-auto min-w-96">
      <Heading
        className="font-bold text-slate-800"
        font="font-Maven-Pro"
        textSize="text-5xl"
      >
        <span className="text-primary"> Remove</span> Budget
      </Heading>

      <div className="max-w-screen-sm my-4 shadow-xl rounded-2xl px-4 py-6">
        <form className="" onSubmit={deleteBudgetHandler}>
          <div className="flex flex-col gap-6 mb-4">
            <SelectCategory
              options={categories}
              onChange={(e) => setActiveCategory(JSON.parse(e.target.value))}
            />

            <div className="">
              <div className="flex justify-between my-1">
                <span className="font-Poppins font-medium text-sm">
                  Spent : &#8377;{activeCategory.spentAmount}
                </span>
                <span className="font-Poppins font-medium text-sm">
                  Remaining : &#8377;{activeCategory.remainingAmount}
                </span>
              </div>

              <ProgressBar progressPercentage={progressPercentage} />
            </div>

            <Button
              className=" transition-all bg-red-500 hover:bg-red-400"
              disabled={isLoading}
            >
              Delete
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RemoveBudget;
