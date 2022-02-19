import { read } from "./httpService";

export async function getDataFromApi(route) {
  const allFlashCards = await read(route);
  return allFlashCards;
}

