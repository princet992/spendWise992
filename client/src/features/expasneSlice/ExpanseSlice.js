import { createSlice } from "@reduxjs/toolkit";

const ExpanseSLice = createSlice({
  name: "Expanse",
  initialState: {
    expanseData: [],
  },
  reducers: {
    setExpanseData: (state, action) => {
      state.expanseData = action.payload;
    },
  },
});

export const { setExpanseData } = ExpanseSLice.actions;
export default ExpanseSLice.reducer;
