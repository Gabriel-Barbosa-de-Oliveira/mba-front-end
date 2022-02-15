import React from "react";
import FlashCard from "../components/FlashCard";
import FlashCards from "../components/FlashCards";
import Header from "../components/Header";
import Main from "../components/Main";
import { allFlashCards } from "../data/flashcards";
export default function FlashCardPage() {
  console.log(allFlashCards);
  return (
    <>
      <Header>react-flash-cards-v1</Header>
      <Main>
        <FlashCards>
          {allFlashCards.map(({ id, title, description }) => {
            return (
              <FlashCard key={id} title={title} description={description} />
            );
          })}
        </FlashCards>
      </Main>
    </>
  );
}
