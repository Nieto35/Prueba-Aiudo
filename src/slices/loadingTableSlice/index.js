import { createSlice } from "@reduxjs/toolkit";
// estado inicial
const initialState = {
  loading: true,
};
// slice de carga para el llamado de usuarios en table, es decir por paginas
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
