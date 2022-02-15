import React, { useState } from "react";
import Button from "../components/Button";
import FlashCard from "../components/FlashCard";
import FlashCards from "../components/FlashCards";
import Header from "../components/Header";
import Main from "../components/Main";
import RadioButton from "../components/RadioButton";
import { allFlashCards } from "../data/flashcards";
import { helperShuffleArray } from "../helpers/arrayHelpers";
export default function FlashCardPage() {
  const [allCards, setAllCards] = useState(allFlashCards);
  const [showTitle, setShowTitle] = useState(true);

  function handleButtonClick() {
    const shuffleCards = helperShuffleArray(allCards);
    setAllCards(shuffleCards);
  }

  function handleRadioShowDescriptionClick() {
    setShowTitle(false);
  }

  function handleRadioShowTitleClick() {
    setShowTitle(true);
  }

  return (
    <>
      <Header>react-flash-cards-v1</Header>
      <Main>
        <div className="text-center mb-4">
          <Button onButtonClick={handleButtonClick}>Embaralhar Cards</Button>
        </div>
        <div className="flex flex-row items-center justify-center space-x-4">
          <RadioButton
            id="radioButtonShowTitle"
            name="showInfo"
            buttonChecked={showTitle}
            onButtonClick={handleRadioShowTitleClick}
          >
            Mostrar Título
          </RadioButton>
          <RadioButton
            id="radioButtonShowDescription"
            name="showInfo"
            buttonChecked={!showTitle}
            onButtonClick={handleRadioShowDescriptionClick}
          >
            Mostrar Descrição
          </RadioButton>
        </div>
        <FlashCards>
          {allCards.map(({ id, title, description }) => {
            return (
              <FlashCard
                key={id}
                title={title}
                description={description}
                showFlashCardTitle={showTitle}
              />
            );
          })}
        </FlashCards>
      </Main>
    </>
  );
}
