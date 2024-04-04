import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentBudgets: [],
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    addBudgets: (state, action) => {
      if (state.currentBudgets.length == 0) {
        state.currentBudgets = [...action.payload];
      }
    },

    addNewBudget: (state, action) => {
      state.currentBudgets.push(action.payload);
    },

    updateBudget: (state, action) => {
      state.currentBudgets = state.currentBudgets.map((budget) =>
        budget._id === action.payload._id ? { ...action.payload } : budget
      );
    },
    removeBudget: (state, action) => {
      state.currentBudgets = state.currentBudgets.filter(
        (budget) => budget._id !== action.payload._id
      );
    },
    removeAllBudgets: (state, action) => {
      state.currentBudgets = [];
    },
  },
});

export const { addBudgets, addNewBudget, updateBudget, removeBudget, removeAllBudgets } =
  budgetSlice.actions;
export default budgetSlice.reducer;
