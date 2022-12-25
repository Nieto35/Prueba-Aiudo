import axios from "axios";

const getApiTable = (data) => {
  return axios
    .get(`https://rickandmortyapi.com/api/character?page=${data}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export default getApiTable;
