import { categories } from "../constants.js";
import { Budget } from "../models/budget.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const addBudget = asyncHandler(async (req, res, next) => {
  const { category, budgetAmount } = req.body;

  if (!category) {
    throw new ApiError(400, "Select a category");
  }

  if (!categories.includes(category)) {

    throw new ApiError(400, "Invalid category");
  }
  if (!budgetAmount) {
    throw new ApiError(400, "Enter amount");
  }

  const createdBudget = await Budget.create({
    category,
    budgetAmount,
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

export { addBudget };
