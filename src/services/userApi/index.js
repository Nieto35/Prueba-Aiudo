import axios from "axios";

const getApiUsers = async (count) => {
  return axios
    .get(`https://rickandmortyapi.com/api/character/${count}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export default getApiUsers;
