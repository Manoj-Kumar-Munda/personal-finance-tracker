import mongoose, { Schema } from "mongoose";

const transactionSchema = Schema(
  {
    itemCategory: {
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
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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

export const Transaction = mongoose.model("Transaction", transactionSchema);
