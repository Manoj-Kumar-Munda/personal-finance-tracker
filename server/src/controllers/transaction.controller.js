import { categories } from "../constants.js";
import { Transaction } from "../models/transaction.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const addTransaction = asyncHandler(async (req, res, next) => {
  const { itemCategory, paidAmount, description } = req.body;
  console.log("user", req.user._id);
 console.log( " body ", req.body)
  console.log("category ", itemCategory)

  if (!itemCategory) {
    throw new ApiError(400, "Select a category");
  }

  if (!categories.includes(itemCategory)) {
    throw new ApiError(400, "Invalid category");
  }
  if (!paidAmount) {
    throw new ApiError(400, "Enter amount");
  }

  const transaction = await Transaction.create({
    itemCategory : itemCategory,
    paidAmount,
    description,
    date: Date.now(),
    user: req.user._id,
  });

  if (!transaction) {
    console.log("Failed to add transactions");
  }
  console.log("Data successfully added ", transaction);

  return res
    .status(200)
    .json(new ApiResponse(200, { transaction }, "Data updated successfully"));
});

export { addTransaction };
