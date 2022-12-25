import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getApiUser from "@services/userApi";
import { setLoading } from "@slices/loadingSlice";

const initialState = {
  data: {},
  dataCharacter: [],
};

export const fetchDataWithDetails = createAsyncThunk(
  "data/fetchDataWithDetails",
  async ({ data, dataCharacters }, { dispatch }) => {
    const found = dataCharacters.filter((ele) => ele.id === data);
    if (found.length > 0) {
      dispatch(setDataUser(found[0]));
    } else {
      dispatch(setLoading(true));
      const userRes = await getApiUser(data);
      if (userRes) {
        const copyCharacters = dataCharacters.map((a) => {
          return { ...a };
        });
        copyCharacters.push(userRes);
        dispatch(setCharacters(copyCharacters));
        dispatch(setDataUser(userRes));
      } else {
        console.log("no se encontro usuario");
      }
      dispatch(setLoading(false));
    }
  }
);

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setDataUser: (state, action) => {
      state.data = action.payload;
    },
    setCharacters: (state, action) => {
      state.dataCharacter = action.payload;
    },
  },
});

export const { setDataUser, setCharacters } = dataSlice.actions;
export default dataSlice.reducer;
