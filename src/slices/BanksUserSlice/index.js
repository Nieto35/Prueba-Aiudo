import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBankUser, createBankUser, editBankUser } from "@services/bankApi";
import { setLoadingBank } from "@slices/loadingBankSlice";

const initialState = {
  data: {},
  dataCharacter: [],
};

export const fetchDataBank = createAsyncThunk(
  "data/fetchDataBank",
  async (data, { dispatch }) => {
    const id = data;
    dispatch(setLoadingBank(true));
    const characters = await getBankUser(id);

    if (characters) {
      if (characters.length > 0) {
        dispatch(setDataBank(characters[0]["counts"]));
      } else {
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

        const userResCreate = await createBankUser(form);
        dispatch(setDataBank(userResCreate["counts"]));
        dispatch(setLoadingBank(false));
      }
    } else {
      console.log("no se encontro usuario");
    }
    dispatch(setLoadingBank(false));
  }
);

export const fetchEditCount = createAsyncThunk(
  "data/fetchEditCount",
  async ({ idUser, form }, { dispatch }) => {
    dispatch(setLoadingBank(true));
    const characters = await editBankUser(idUser, form);
    if (characters) {
      dispatch(setDataBank(characters["counts"]));
    } else {
      console.log("no se pudo ejecutar");
    }
    dispatch(setLoadingBank(false));
  }
);


export const fetchTransferMoney = createAsyncThunk(
  "data/fetchTransferMoney",
  async ({ cuenta, idUser, personaje, consignar, idBank }, { dispatch }) => {
    dispatch(setLoadingBank(true));

    const otherCharacter = await getBankUser(personaje);
    if (otherCharacter) {
      const characters = await getBankUser(idUser);
      if (characters) {
        if (characters.length > 0) {
          if (otherCharacter.length > 0) {
            const { counts } = otherCharacter[0];
            const bank = counts.filter((ele) => ele.id === cuenta)[0];
            const otherBanks = counts.filter((ele) => ele.id !== cuenta);

            const money = parseFloat(consignar) + parseFloat(bank["money"]);
            bank["money"] = `${money}`;
            const formBank = {
              counts: [...otherBanks, bank],
            };
            const editOtherCharacter = await editBankUser(personaje, formBank);
            if (editOtherCharacter) {

              const { counts } = characters[0];
              const bank = counts.filter((ele) => ele.id === idBank)[0];
              const otherBanks = counts.filter((ele) => ele.id !== idBank);

              const moneyCharacter = parseFloat(bank.money) - parseFloat(consignar);
              bank["money"] = `${moneyCharacter}`;
              const formBankCharacter = {
                counts: [...otherBanks, bank],
              };

              const actualCharacter = await editBankUser(idUser, formBankCharacter);
              if (actualCharacter) {
                dispatch(setDataBank(actualCharacter["counts"]));
              } else {
                console.log("no se pudo ejecutar");
              }
            }
          } else {
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

            const bank = form.counts.filter((ele) => ele.id === cuenta)[0];
            const otherBanks = form.counts.filter((ele) => ele.id !== cuenta);

            const money = parseFloat(consignar) + parseFloat(bank["money"]);
            bank["money"] = `${money}`;
            const formBank = {
              ...form,
              counts: [...otherBanks, bank],
            };

            const userResCreate = await createBankUser(formBank);
            if (userResCreate) {
              const { counts } = characters[0];
              const bank = counts.filter((ele) => ele.id === idBank)[0];
              const otherBanks = counts.filter((ele) => ele.id !== idBank);

              const moneyCharacter = parseFloat(bank.money) - parseFloat(consignar);
              bank["money"] = `${moneyCharacter}`;
              const formBankCharacter = {
                counts: [...otherBanks, bank],
              };

              const actualCharacter = await editBankUser(idUser, formBankCharacter);
              if (actualCharacter) {
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
