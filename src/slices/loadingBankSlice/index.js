import { createSlice } from "@reduxjs/toolkit";

// estado inicial
const initialState = {
  loading: true,
};
// slice estado de carga para todo lo necesario de bancos
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
