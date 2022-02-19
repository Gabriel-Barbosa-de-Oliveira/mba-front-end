import { read, exclude, create, edit } from "./httpService";
import { getNewId } from "./idService";

export async function apiGetAllFlashcards() {
  const allFlashCards = await read('/flashcards');
  return allFlashCards;
}

export async function apiDeleteFlashcard(id) {
  await exclude(`/flashcards/${id}`)
}

export async function apiCreateFlashcard(title, description) {
  const newFlashCard = await create('/flashcards', {
    id: getNewId(),
    title,
    description
  })
  return newFlashCard;
}

export async function apiUpdateFlashcard(id, title, description) {
  const newFlashCard = await edit(`/flashcards/${id}`, {
    title,
    description
  })
  return newFlashCard;
}