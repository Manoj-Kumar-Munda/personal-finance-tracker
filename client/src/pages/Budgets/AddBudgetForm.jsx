import React from "react";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";

const AddBudgetForm = () => {
  return (
    <>
      <h1 className="text-5xl font-Maven-Pro font-bold text-slate-800 ">
        Add <span className="text-primary">Budget</span>
      </h1>

      <div className="max-w-screen-sm my-4 shadow-xl  rounded-2xl px-4 py-6 ">
        <form className="">
          <div className="flex flex-col gap-4 mb-4">
            <Input label="Budget Name" placeholder="e.g. Food, Travel, Health, etc." />

            <Input label="Amount" placeholder="" type="number" />
          </div>

          <Button className="transition-colors hover:bg-primary/80">Add Budget</Button>
        </form>
      </div>
    </>
  );
};

export default AddBudgetForm;
