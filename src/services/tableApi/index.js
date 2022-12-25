import axios from "axios";

const getApiTable = () => {
  return axios
    .get(`https://rickandmortyapi.com/api/character`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export default getApiTable;
