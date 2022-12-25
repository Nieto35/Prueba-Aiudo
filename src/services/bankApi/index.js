import axios from "axios";

const charactersUrl = "http://localhost:3500/characters"; // request URL
const bankUrl = "http://localhost:3500/characters"; // request URL
const axiosHeaders = {
  "Content-Type": "application/json",
};

const getBankUser = async (id) => {
  return axios
    .get(`${charactersUrl}?id=${id}`, axiosHeaders)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const createBankUser = async (form) => {
  return axios
    .post(charactersUrl, form, axiosHeaders)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

const editBankUser = async (idUser, form) => {
  return axios
    .put(`${bankUrl}/${idUser}`, form, axiosHeaders)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export { getBankUser, createBankUser, editBankUser };
