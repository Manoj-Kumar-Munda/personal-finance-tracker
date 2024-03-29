import mongoose from "mongoose";
import { Budget } from "../models/budget.model.js";
import { Expense } from "../models/expense.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const addExpenses = asyncHandler(async (req, res, next) => {
  const { category, paidAmount, description } = req.body;

  const session = await mongoose.startSession();
  console.log("Category: ", category);

  const date = new Date();

  if (!category) {
    throw new ApiError(400, "Select a category");
  }

  if (!paidAmount) {
    throw new ApiError(400, "Enter amount");
  }

  let result;
  session.startTransaction();

  try {
    [result] = await Expense.create(
      [
        {
          category: category.category,
          categoryId: category._id,
          paidAmount,
          description,
          date,
          user: req.user._id,
        },
      ],
      { session }
    );

    if (!result) {
      throw new ApiError(400, "Failed to create expense");
    }
    const user = await User.findById(req.user._id);
    user.recentExpenses.push(result);
    await user.save({ validateBeforeSave: false }, { session });
    const categoryBudget = await Budget.aggregate([
      {
        $match: { createdBy: user._id },
      },
      {
        $match: { category: category.category },
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
        $push: {
          spendingsHistory: result,
        },
      },
      {
        new: true,
      },
      {
        session
      }
    );
    await session.commitTransaction();
  } catch (error) {
    console.log("Session: ", error);
    await session.abortTransaction();
    throw new ApiError(400, error.message || "Failed to add expense");
  } finally {
    session.endSession();
  }
  return res
    .status(200)
    .json(new ApiResponse(201, result, "Expense created successfully"));
});

export { addExpenses };
