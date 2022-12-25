import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getApiTable from "@services/tableApi";
import { setLoadingTable } from "@slices/loadingTableSlice";

const initialState = {};

export const fetchDataTable = createAsyncThunk(
  "data/fetchDataTable",
  async (data, { dispatch }) => {
    dispatch(setLoadingTable(true));
    const userRes = await getApiTable(data);
    if (userRes) {
      dispatch(setDataTable(userRes.results));
    } else {
      console.log("no se encontro usuario");
    }
    dispatch(setLoadingTable(false));
  }
);

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setDataTable: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setDataTable } = dataSlice.actions;
export default dataSlice.reducer;
