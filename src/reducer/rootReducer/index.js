import { combineReducers } from "redux";
import dataReducer from "@slices/dataUserSlice";
import loadingSlice from "@slices/loadingSlice";
import dataTable from "@slices/dataTableSlice";
import loadingTableSlice from "@slices/loadingTableSlice";
import dataBankReducer from "@slices/BanksUserSlice";
import loadingBankSlice from "@slices/loadingBankSlice";

// este Reducer funciona para combinar todos los Slices
// y de esta manera llevar la logica separada.
const rootReducer = combineReducers({
  data: dataReducer,
  loading: loadingSlice,
  table: dataTable,
  loadingTable: loadingTableSlice,
  dataBank: dataBankReducer,
  loadingBank: loadingBankSlice,
});

export default rootReducer;
