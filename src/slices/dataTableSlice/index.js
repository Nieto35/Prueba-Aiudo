import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getApiTable from "@services/tableApi";
import { setLoadingTable } from "@slices/loadingTableSlice";

// datos iniciales
const initialState = {};

export const fetchDataTable = createAsyncThunk(
  "data/fetchDataTable",
  async (data, { dispatch }) => {
    // ponemos estado de carga
    dispatch(setLoadingTable(true));
    // obtenemos datos de la api mandando la pagina que queremos
    const userRes = await getApiTable(data);
    // verificamos que todo haya salido bien
    if (userRes) {
      // editamos variables en uso de Redux
      dispatch(setDataTable(userRes.results));
    } else {
      console.log("no se encontro usuario");
    }
    // apagamos estado de carga
    dispatch(setLoadingTable(false));
  }
);

// se crea el Slice
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
