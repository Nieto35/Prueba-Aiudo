import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
};

export const loadingBankSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoadingBank: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoadingBank } = loadingBankSlice.actions;

export default loadingBankSlice.reducer;
