import axios from "axios";
// consulta la cual trae a un solo personaje de Rick y Morty
const getApiUsers = async (count) => {
  return axios
    .get(`https://rickandmortyapi.com/api/character/${count}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export default getApiUsers;
