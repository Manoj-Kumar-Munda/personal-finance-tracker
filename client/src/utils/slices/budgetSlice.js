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
  },
});

export const { addBudgets, addNewBudget } = budgetSlice.actions;
export default budgetSlice.reducer;
