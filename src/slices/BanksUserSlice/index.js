import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import Services
import { getBankUser, createBankUser, editBankUser } from "@services/bankApi";
// close import Services
// slice loading
import { setLoadingBank } from "@slices/loadingBankSlice";
// datos iniciales
const initialState = {
  data: {},
  dataCharacter: [],
};

export const fetchDataBank = createAsyncThunk(
  "data/fetchDataBank",
  async (data, { dispatch }) => {
    const id = data;
    // ponemos estado de carga
    dispatch(setLoadingBank(true));
    // obtenemos los bancos del usuario
    const characters = await getBankUser(id);
    // verificamos que el usuario exista
    if (characters) {
      // verificamos que el usuario tenga bancos
      if (characters.length > 0) {
        // si tiene bancos envia sus datos a donde fue solicitado
        dispatch(setDataBank(characters[0]["counts"]));
      } else {
        // si no tiene bancos, se crea una variable
        // con id del usuario, con los datos de los 3 bancos.
        const form = {
          id,
          counts: [
            {
              logo: "http://localhost:3007/assets/3af9e945035c3721721f05cb90e08d0f.svg",
              id: "1",
              money: "500",
              debt: "0",
              original_debt: "0",
              number_quotas_elected: "0",
              original_number_quotas_elected: "0",
              paid_quota: "0",
              weekly_payment: "0",
            },
            {
              logo: "http://localhost:3007/assets/8573f84693f75cae4c675693e5f33bfe.svg",
              id: "2",
              money: "500",
              debt: "0",
              original_debt: "0",
              number_quotas_elected: "0",
              original_number_quotas_elected: "0",
              paid_quota: "0",
              weekly_payment: "0",
            },
            {
              logo: "http://localhost:3007/assets/a81b172b71af10c97a265ce1edf738e7.svg",
              id: "3",
              money: "500",
              debt: "0",
              original_debt: "0",
              number_quotas_elected: "0",
              original_number_quotas_elected: "0",
              paid_quota: "0",
              weekly_payment: "0",
            },
          ],
        };
        // Se Crea el usuario con los bancos en el Json
        const userResCreate = await createBankUser(form);
        // se envian los datos de cuenta donde fueron solicitados
        dispatch(setDataBank(userResCreate["counts"]));
        // se apaga el estado de carga
        dispatch(setLoadingBank(false));
      }
    } else {
      console.log("no se encontro usuario");
    }
    // se apaga el estado de carga
    dispatch(setLoadingBank(false));
  }
);

// funcion editar cuenta bancaria
export const fetchEditCount = createAsyncThunk(
  "data/fetchEditCount",
  async ({ idUser, form }, { dispatch }) => {
    // se obtiene el id y la cuenta bancaria modificada en arreglo
    // encendemos estaado de carga
    dispatch(setLoadingBank(true));
    // capturamos resultado, de editBank (services)
    const characters = await editBankUser(idUser, form);
    // verificamos respuesta de services
    if (characters) {
      // retornamos datos modificados de las cuentas, a variables
      // que tengan en uso el Redux
      dispatch(setDataBank(characters["counts"]));
    } else {
      console.log("no se pudo ejecutar");
    }
    dispatch(setLoadingBank(false));
  }
);

// funcion de transferencia
export const fetchTransferMoney = createAsyncThunk(
  "data/fetchTransferMoney",
  async ({ cuenta, idUser, personaje, consignar, idBank }, { dispatch }) => {
    // obtenemos todos los datos necesarios para transferencia

    // ponemos estado de carga
    dispatch(setLoadingBank(true));

    // obtenemos bancos de la persona a la que le llegara la transaccion
    const otherCharacter = await getBankUser(personaje);
    // verificamos que encuentre la persona
    if (otherCharacter) {
      // obtenemos bancos de la persona que enviara dinero
      const characters = await getBankUser(idUser);
      // verificamos que encuentre la persona
      if (characters) {
        // verifica que tenga cuentas bancarias el usuario que envia dinero
        if (characters.length > 0) {
          // verificamos que el usuario que recibe dinero tenga cuentas bancarias
          if (otherCharacter.length > 0) {
            // si tiene cuentas bancarias, separamos las cuentas del id
            const { counts } = otherCharacter[0];
            // obtenemos la cuenta que nos interesa modificar
            const bank = counts.filter((ele) => ele.id === cuenta)[0];
            // obtenemos las cuentas que no nos interesa modificar
            const otherBanks = counts.filter((ele) => ele.id !== cuenta);

            // sumamos el dinero que tenia +  el dinero que le consignaron
            const money = parseFloat(consignar) + parseFloat(bank["money"]);
            // lo introducimos a la variable como String
            bank["money"] = `${money}`;
            // juntamos el banco modificado con los que no fueron modificados
            const formBank = {
              counts: [...otherBanks, bank],
            };
            // enviamos id y datos de banco a editBankUser(services)
            // para que los envie a el Json
            const editOtherCharacter = await editBankUser(personaje, formBank);
            // obtenemos la respuesta
            if (editOtherCharacter) {
              // si todo lo anterior salio bien debemos restarle el dinero a
              // la persona que lo envia
              // obtenemos sus cuentas bancarias
              const { counts } = characters[0];
              // separamos la cuenta que queremos modificar
              const bank = counts.filter((ele) => ele.id === idBank)[0];
              // separamos las cuentas que no nos interesa modificar
              const otherBanks = counts.filter((ele) => ele.id !== idBank);

              // restamos el dinero que envió
              const moneyCharacter =
                parseFloat(bank.money) - parseFloat(consignar);
              // lo introducimos como string
              bank["money"] = `${moneyCharacter}`;
              // juntamos el banco modificado con los no modificados
              const formBankCharacter = {
                counts: [...otherBanks, bank],
              };

              // enviamos el id del usuario con los bancos modificados a editBank (services)
              const actualCharacter = await editBankUser(
                idUser,
                formBankCharacter
              );
              // verificamos que la modificacion haya sido un exito
              if (actualCharacter) {
                //enviiamos datos a variables en uso
                dispatch(setDataBank(actualCharacter["counts"]));
              } else {
                console.log("no se pudo ejecutar");
              }
            }
          } else {
            // si el usuario al que se le consigna el dinero no tiene cuentas bancarias
            // se le crea sus cuentas bancarias con el id e informacion de las cuentas
            // todas las cuentas empiezan con 500
            const form = {
              id: `${personaje}`,
              counts: [
                {
                  logo: "http://localhost:3007/assets/3af9e945035c3721721f05cb90e08d0f.svg",
                  id: "1",
                  money: "500",
                  debt: "0",
                  original_debt: "0",
                  number_quotas_elected: "0",
                  original_number_quotas_elected: "0",
                  paid_quota: "0",
                  weekly_payment: "0",
                },
                {
                  logo: "http://localhost:3007/assets/8573f84693f75cae4c675693e5f33bfe.svg",
                  id: "2",
                  money: "500",
                  debt: "0",
                  original_debt: "0",
                  number_quotas_elected: "0",
                  original_number_quotas_elected: "0",
                  paid_quota: "0",
                  weekly_payment: "0",
                },
                {
                  logo: "http://localhost:3007/assets/a81b172b71af10c97a265ce1edf738e7.svg",
                  id: "3",
                  money: "500",
                  debt: "0",
                  original_debt: "0",
                  number_quotas_elected: "0",
                  original_number_quotas_elected: "0",
                  paid_quota: "0",
                  weekly_payment: "0",
                },
              ],
            };

            // despues de crear las cuentas se filtra la cuenta que se desea editar
            const bank = form.counts.filter((ele) => ele.id === cuenta)[0];
            // separamos las cuentas que no nos interesa editar
            const otherBanks = form.counts.filter((ele) => ele.id !== cuenta);

            // sumamos el dinero que le transfirieron
            const money = parseFloat(consignar) + parseFloat(bank["money"]);
            // insertamos el dinero en string
            bank["money"] = `${money}`;
            // juntamos la cuenta editada con las no editadas
            const formBank = {
              ...form,
              counts: [...otherBanks, bank],
            };
            // en este caso llamamos create bank con formBank, debido
            // que el usuario no tenia cuentas bancarias. (services)
            const userResCreate = await createBankUser(formBank);
            // verificamos que todo haya salido bien
            if (userResCreate) {
              // si todo salió bien, debemos quitarle el dinero a la persona que lo envia
              // separamos las cuentas bancarias
              const { counts } = characters[0];
              // filtramos la cuenta que nos interesa modificar
              const bank = counts.filter((ele) => ele.id === idBank)[0];
              // filtramos las cuentas que no nos interesa modificar
              const otherBanks = counts.filter((ele) => ele.id !== idBank);

              // restamos el dinero, que fue enviado
              const moneyCharacter =
                parseFloat(bank.money) - parseFloat(consignar);
              // introducimos el dinero como string
              bank["money"] = `${moneyCharacter}`;
              // juntamos el banco editado con lo no editados
              const formBankCharacter = {
                counts: [...otherBanks, bank],
              };

              // se envia los bancos editados con el id del usuario a editar
              // a editBankUser (services)
              const actualCharacter = await editBankUser(
                idUser,
                formBankCharacter
              );
              // verificamos que todo haya salido bien
              if (actualCharacter) {
                // modificamos los datos de la variable usada
                // todos los componentes que llamen a esta con Redux
                // seran modificados
                dispatch(setDataBank(actualCharacter["counts"]));
              } else {
                console.log("no se pudo ejecutar");
              }
            } else {
              console.log("no se pudo ejecutar");
            }
          }
        } else {
          console.log("no se encontro usuario");
        }
      } else {
        console.log("no se encontro usuario");
      }
    } else {
      console.log("no se encontro usuario");
    }

    dispatch(setLoadingBank(false));
  }
);

// creamos el Slice
export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setDataBank: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setDataBank } = dataSlice.actions;
export default dataSlice.reducer;
