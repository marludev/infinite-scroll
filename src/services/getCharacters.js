import axios from "axios";

export default async (keyword = "") => {
  const url = `https://rickandmortyapi.com/api/character/${keyword}`;
  const response = await axios.get(url);
  return response.data;
};
