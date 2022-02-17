import { read, exclude, create } from "./httpService";
import { getNewId } from "./idService";

export async function apiGetAllFlashcards() {
  const allFlashCards = await read('/flashcards');
  return allFlashCards;
}

export async function apiDeleteFlashcard(id) {
  await exclude(`/flashcards/${id}`)
}

export async function apiCreateFlashcard(title, description) {
  // await exclude(`/${id}`)
  const newFlashCard = await create('/flashcards', {
    id: getNewId(),
    title,
    description
  })
  return newFlashCard;
}