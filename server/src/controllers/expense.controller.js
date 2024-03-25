import { Budget } from "../models/budget.model.js";
import { Expense } from "../models/expense.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const addExpenses = asyncHandler(async (req, res, next) => {
  const { category, paidAmount, description } = req.body;

  const date = new Date();

  if (!category) {
    throw new ApiError(400, "Select a category");
  }

  if (!paidAmount) {
    throw new ApiError(400, "Enter amount");
  }

  const result = await Expense.create({
    category,
    paidAmount,
    description,
    date,
    user: req.user._id,
  });

  if (!result) {
    throw new ApiError(400, "Failed to add expense");
  }

  const user = await User.findById(req.user._id);
  user.recentExpenses.push(result);

  await user.save({ validateBeforeSave: false });

  const categoryBudget = await Budget.aggregate([
    {
      $match: { createdBy: user._id },
    },
    {
      $match: { category },
    },
    {
      $match: {
        date: {
          $gte: new Date(date.getFullYear(), date.getMonth(), 1),
          $lt: new Date(date.getFullYear(), date.getMonth() + 1, 1),
        },
      },
    },
    {
      $project: {
        _id: 1,
        category: 1,
      },
    },
  ]);

  if (categoryBudget.length === 0) {
    throw new ApiError(400, "No budget created for this category");
  }

  await Budget.findByIdAndUpdate(
    categoryBudget[0]._id,
    {
      $inc: { spentAmount: paidAmount, remainingAmount: -paidAmount },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Data updated successfully"));
});

export { addExpenses };
