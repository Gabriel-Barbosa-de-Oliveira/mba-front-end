import { get } from "./httpService";

const BACK_END_URL = 'http://localhost:3001/flashcards'

export async function apiGetAllFlashcards() {
  const allFlashCards = await get(BACK_END_URL);
  return allFlashCards;
}