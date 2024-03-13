import { categories } from "../constants.js";
import { Expense } from "../models/expense.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const addExpenses = asyncHandler(async (req, res, next) => {
  const { category, paidAmount, description } = req.body;


  if (!category) {
    throw new ApiError(400, "Select a category");
  }

  if (!categories.includes(category)) {
    throw new ApiError(400, "Invalid category");
  }
  if (!paidAmount) {
    throw new ApiError(400, "Enter amount");
  }

 

  const result = await Expense.create({
    category,
    paidAmount,
    description,
    date: Date.now(),
    user: req.user._id,
  });

  if (!result) {
    console.log("Failed to add expenses");
  }
  console.log("Data successfully added ", result);

  const user = await User.findById(req.user._id);
  user.recentExpenses.push(result);

  await user.save({ validateBeforeSave: false });

  console.log(" expenses added to user collection");

  return res
    .status(200)
    .json(new ApiResponse(200, { expenses: result }, "Data updated successfully"));
});

export { addExpenses };
