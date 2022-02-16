import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import FlashCard from "../components/FlashCard";
import FlashCards from "../components/FlashCards";
import Header from "../components/Header";
import Main from "../components/Main";
import RadioButton from "../components/RadioButton";
import { helperShuffleArray } from "../helpers/arrayHelpers";
import { apiGetAllFlashcards } from "../services/apiService";
export default function FlashCardPage() {
  // Back End
  const [allCards, setAllCards] = useState([]);

  // Exclusivo para "Estudo"
  const [studyCards, setStudyCards] = useState([]);
  const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);

  useEffect(() => {
    // apiGetAllFlashcards().then((allFlashCards) => {
    //   setAllCards(allFlashCards);
    // });

    async function getAllCards() {
      const backEndAllCards = await apiGetAllFlashcards();
      setAllCards(backEndAllCards);
    }

    getAllCards();
  }, []);

  function handleShuffle() {
    const shuffleCards = helperShuffleArray(studyCards);
    setStudyCards(shuffleCards);
  }

  useEffect(() => {
    setStudyCards(allCards.map((card) => ({ ...card, showTitle: true })));
  }, [allCards]);

  function handleRadioShowDescriptionClick() {
    const updatedCards = [...studyCards].map((card) => ({
      ...card,
      showTitle: false,
    }));
    setStudyCards(updatedCards);
    setRadioButtonShowTitle(false);
  }

  function handleRadioShowTitleClick() {
    const updatedCards = [...studyCards].map((card) => ({
      ...card,
      showTitle: true,
    }));
    setStudyCards(updatedCards);
    setRadioButtonShowTitle(true);
  }

  function handleToggleFlashCard(cardId) {
    const updatedCards = [...studyCards];
    const cardIndex = updatedCards.findIndex((card) => card.id === cardId);
    updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle;
    setStudyCards(updatedCards);
  }

  return (
    <>
      <Header>react-flash-cards-v2</Header>
      <Main>
        <div className="text-center mb-4">
          <Button onButtonClick={handleShuffle}>Embaralhar Cards</Button>
        </div>
        <div className="flex flex-row items-center justify-center space-x-4">
          <RadioButton
            id="radioButtonShowTitle"
            name="showInfo"
            buttonChecked={radioButtonShowTitle}
            onButtonClick={handleRadioShowTitleClick}
          >
            Mostrar Título
          </RadioButton>
          <RadioButton
            id="radioButtonShowDescription"
            name="showInfo"
            buttonChecked={!radioButtonShowTitle}
            onButtonClick={handleRadioShowDescriptionClick}
          >
            Mostrar Descrição
          </RadioButton>
        </div>
        <FlashCards>
          {studyCards.map(({ id, title, description, showTitle }) => {
            return (
              <FlashCard
                key={id}
                id={id}
                title={title}
                description={description}
                showFlashCardTitle={showTitle}
                onToggleFlashCard={handleToggleFlashCard}
              />
            );
          })}
        </FlashCards>
      </Main>
    </>
  );
}
