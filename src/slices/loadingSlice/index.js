import { createSlice } from "@reduxjs/toolkit";

// estado inicial
const initialState = {
  loading: true,
};
// slice para carga de usuario individual.
export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
