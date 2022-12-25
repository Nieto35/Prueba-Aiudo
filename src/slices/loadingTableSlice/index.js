import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
};

export const loadingTableSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoadingTable: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoadingTable } = loadingTableSlice.actions;

export default loadingTableSlice.reducer;
