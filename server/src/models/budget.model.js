import mongoose, { Schema } from "mongoose";

const budgetSchema = Schema(
  {
    category: {
      type: String,
      required: true,
    },
    budgetAmount: {
      type: Number,
      required: true,
    },
    spentAmount: {
      type: Number,
      default: 0,
    },
    remainingAmount: {
      type: Number,
    },
    date: {
      type: Date,
      require: true
    }
  },
  {
    timestamps: true,
  }
);

export const Budget = mongoose.model("Budget", budgetSchema);

