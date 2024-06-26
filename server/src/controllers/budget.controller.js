import { Budget } from "../models/budget.model.js";
import { Expense } from "../models/expense.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const addBudget = asyncHandler(async (req, res, next) => {
  const { category, budgetAmount } = req.body;
  const date = new Date();

  if (!category) {
    throw new ApiError(400, "Select a category");
  }

  if (!budgetAmount) {
    throw new ApiError(400, "Enter amount");
  }

  const existingBudget = await Budget.findOne({
    category,
    date: {
      $gte: new Date(date.getFullYear(), date.getMonth(), 1),
      $lt: new Date(date.getFullYear(), date.getMonth() + 1, 1),
    },
  });

  if (existingBudget) {
    throw new ApiError(400, "Budget already created for this category");
  }

  const createdBudget = await Budget.create({
    category,
    budgetAmount,
    date: new Date(),
    remainingAmount: budgetAmount,
    createdBy: req.user._id,
  });

  const user = await User.findById(req.user._id);

  user.createdBudgets.push(createdBudget);

  await user.save({ validateBeforeSave: false });

  if (!createdBudget) {
    throw new ApiError(500, "Some internal issue occured");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdBudget, "budget created"));
});

const removeBudget = asyncHandler(async (req, res, next) => {
  const budgetId = req.params.id;
  console.log("budgetId: ", budgetId)
  const budget = await Budget.findById(budgetId);
  if (!budget) {
    throw new ApiError(404, "Budget not found");
  }

  const isDeleted = await Budget.findByIdAndDelete(budgetId);

  if (!isDeleted) {
    throw new ApiError(500, "Failed to delete budget");
  }

  await User.findByIdAndUpdate(budget.createdBy, {
    $pull: { createdBudgets: budgetId },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, budget, "recored deleted successfully"));
});

const editBudget = asyncHandler(async (req, res, next) => {
  const { _id: budgetId, newBudgetAmount, spentAmount } = req.body;

  const updatedBudget = await Budget.findByIdAndUpdate(
    budgetId,
    {
      $set: {
        budgetAmount: newBudgetAmount,
        remainingAmount: newBudgetAmount - spentAmount,
      },
    },
    {
      new: true,
    }
  );
  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedBudget, "Budget is modified successfully")
    );
});

const getBudgetInfo = asyncHandler(async (req, res, next) => {
  const budgetId = req.params.id;

  const budget = await Budget.findById(budgetId);
  if (!budget) {
    throw new ApiError(404, "Budget not found");
  }

  return res.status(200).json(new ApiResponse(200, budget, ""));
});

const getBudgetExpenditureInfo = asyncHandler(async (req, res, next) => {
  const budgetId = req.params.id;
  const budget = await Budget.findById(budgetId);

  const spendings = await Expense.find({
    _id: {
      $in: budget.spendingsHistory,
    },
  });

  if (!spendings) {
    throw new ApiError(404, "Haven't spent a penny");
  }

  return res.status(200).json(new ApiResponse(200, spendings, ""));
});

export {
  addBudget,
  removeBudget,
  editBudget,
  getBudgetInfo,
  getBudgetExpenditureInfo,
};
