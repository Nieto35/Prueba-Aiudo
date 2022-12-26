import axios from "axios";
// obtiene datos de la consulta api Rick y Morty
const getApiTable = (data) => {
  return axios
    .get(`https://rickandmortyapi.com/api/character?page=${data}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export default getApiTable;
