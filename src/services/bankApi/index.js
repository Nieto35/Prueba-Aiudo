import axios from "axios";
// todos los datos y urls, fueron siguiendo la documentacion de Json-server
const charactersUrl = "http://localhost:3500/characters"; // request URL
const bankUrl = "http://localhost:3500/characters"; // request URL
const axiosHeaders = {
  "Content-Type": "application/json",
};
// funcion para obtener banco de usuarios
const getBankUser = async (id) => {
  return axios
    .get(`${charactersUrl}?id=${id}`, axiosHeaders)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
// funcion para crear usuario con bancos
const createBankUser = async (form) => {
  return axios
    .post(charactersUrl, form, axiosHeaders)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
// funcion para editar bancos de usuario
const editBankUser = async (idUser, form) => {
  return axios
    .put(`${bankUrl}/${idUser}`, form, axiosHeaders)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export { getBankUser, createBankUser, editBankUser };
