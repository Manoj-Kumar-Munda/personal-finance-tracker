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
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: Date,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Budget = mongoose.model("Budget", budgetSchema);
