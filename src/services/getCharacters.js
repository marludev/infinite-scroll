import axios from "axios";

const getCharacters = async (keyword = "") => {
  const url = `https://rickandmortyapi.com/api/character/${keyword}`;
  const response = await axios.get(url);
  return response.data;
};
export default getCharacters;
