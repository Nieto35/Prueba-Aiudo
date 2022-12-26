import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getApiUser from "@services/userApi";
import { setLoading } from "@slices/loadingSlice";

// datos iniciales
const initialState = {
  data: {},
  dataCharacter: [],
};

export const fetchDataWithDetails = createAsyncThunk(
  "data/fetchDataWithDetails",
  async ({ data, dataCharacters }, { dispatch }) => {
    // obtenemos datos enviados
    // verificamos si el id ya ha sido consultado a la api antes
    const found = dataCharacters.filter((ele) => ele.id === data);
    // si el dato ya fue consultado antes lo tenemos guardado en dataCharacter
    // asi no tenemos que consultar la api una vez mas
    if (found.length > 0) {
      // si el dato ya a sido consultado antes simplemente lo enviamos
      // a las variables que llamen la funcion en Redux
      dispatch(setDataUser(found[0]));
    } else {
      // si no, iniciamos estado de carga
      dispatch(setLoading(true));
      // consultamos el id en la api a traves de getApiUser(services)
      const userRes = await getApiUser(data);
      // verificamos que todo haya salido bien
      if (userRes) {
        // si todo salio bien hacemos una copia de datacharacters
        const copyCharacters = dataCharacters.map((a) => {
          return { ...a };
        });
        //introducimos el dato nuevo para que no se vuelva a consultar a la api
        copyCharacters.push(userRes);
        // enviamos el dato consultado a las variables
        // que tienen Redux
        dispatch(setCharacters(copyCharacters));
        dispatch(setDataUser(userRes));
      } else {
        console.log("no se encontro usuario");
      }
      // apagamos estado de carga
      dispatch(setLoading(false));
    }
  }
);

// creamos slice en este caso como se pueden modificar 2 variables tiene 2 reducers
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
