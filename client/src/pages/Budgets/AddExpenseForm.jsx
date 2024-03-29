import React, { useState } from "react";
import SelectCategory from "../../components/form/Select";
import Button from "../../components/form/Button";
import { useSelector } from "react-redux";
import Heading from "../../components/ui/Heading";
import Input from "../../components/form/Input";

const AddExpenseForm = () => {
  const categories = useSelector((store) => store.budget.currentBudgets);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  if(categories.length === 0) {
    return null;
  }
  return (
    <div className="flex-grow basis-auto min-w-96">
      <Heading
        className="font-bold text-slate-800"
        font="font-Maven-Pro"
        textSize="text-5xl"
      >
        <span className="text-primary">Add</span> Expense
      </Heading>

      <div className="max-w-screen-sm my-4 shadow-xl rounded-2xl px-4 py-6">
        <form className="" onSubmit={""}>
          <div className="flex flex-col gap-6 mb-4">
            <SelectCategory
              options={categories}
              onChange={(e) => setActiveCategory(JSON.parse(e.target.value))}
            />

            <Input label="*Amount" type="number" name="budgetAmount" />
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
