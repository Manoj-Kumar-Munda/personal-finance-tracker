import mongoose, { Schema } from "mongoose";

const expensesSchema = Schema(
  {
    category: {
      type: String,
      required: true,
    },
    paidAmount: {
      type: Number,
      default: 0,
      required: true,
    },
    description: {
      type: String,
    },
   
    date: {
        type: Date,
        required: true
    }
  },
  {
    timestamps: true,
  }
);

export const Expense = mongoose.model("expense", expensesSchema);
