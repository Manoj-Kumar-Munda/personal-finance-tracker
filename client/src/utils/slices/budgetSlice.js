import { createSlice } from "@reduxjs/toolkit";

const budgetSlice = createSlice({
  name: "budget",
  initialState: {
    currentBudgets: [],
  },
  reducers: {
    addBudgets: (state, action) => {
      console.log("Action payload: ", action.payload);
      if (Array.isArray(action.payload)) {

        const data = action.payload;
      } else {
        state.currentBudgets.push(action.payload);
      }
    },
  },
});

export const { addBudgets } = budgetSlice.actions;
export default budgetSlice.reducer;
