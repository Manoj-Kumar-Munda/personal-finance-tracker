import { categories } from "../constants.js";
import { Budget } from "../models/budget.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const addBudget = asyncHandler(async (req, res, next) => {
  const { category, budgetAmount,} = req.body;
  const date = new Date();
  date.setMonth(5);
  if (!category) {
    throw new ApiError(400, "Select a category");
  }

  if (!categories.includes(category)) {
    throw new ApiError(400, "Invalid category");
  }
  if (!budgetAmount) {
    throw new ApiError(400, "Enter amount");
  }

  
  const existingBudget = await Budget.findOne({
    category,
    date: { $gte: new Date(date.getFullYear(), date.getMonth(), 1), $lt: new Date(date.getFullYear(), date.getMonth() + 1, 1) }
});

console.log("existing budget", existingBudget);
if(existingBudget){
  throw new ApiError(400, "Budget already created for this category");
}


 

  const createdBudget = await Budget.create({
    category,
    budgetAmount,
    date: new Date(),
    remainingAmount: budgetAmount,
    user: req.user._id,
  });

  const user = await User.findById(req.user._id);

  user.createdBudgets.push(createdBudget);

  await user.save({ validateBeforeSave: false });

  if (!createdBudget) {
    throw new ApiError(500, "Some internal issue occured");
  }
  console.log("Budget created successfully");

  return res
    .status(200)
    .json(new ApiResponse(200, { createdBudget }, "budget created"));
});

const removeBudget = asyncHandler(async (req, res, next) => {
  
  const { budgetId } = req.body;
  const budget = await Budget.findById(budgetId);
  if (!budget) {
    throw new ApiError(404, "Budget not found");
  }

  const isDeleted = await Budget.deleteOne({ _id: budgetId });

  if (!isDeleted) {
    throw new ApiError(500, "Failed to delete budget");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "recored deleted successfully"));
});

export { addBudget, removeBudget };
