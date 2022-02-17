import { read, exclude } from "./httpService";

export async function apiGetAllFlashcards() {
  const allFlashCards = await read();
  return allFlashCards;
}

export async function apiDeleteFlashcard(id) {
  await exclude(`/${id}`)
}