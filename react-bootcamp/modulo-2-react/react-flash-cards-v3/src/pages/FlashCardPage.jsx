import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Error from "../components/Error";
import FlashCard from "../components/FlashCard";
import FlashCards from "../components/FlashCards";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Main from "../components/Main";
import RadioButton from "../components/RadioButton";
import { helperShuffleArray } from "../helpers/arrayHelpers";
import {
  apiCreateFlashcard,
  apiDeleteFlashcard,
  apiGetAllFlashcards,
  apiUpdateFlashcard,
} from "../services/apiService";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import FlashCardItem from "../components/FlashCardItem";
import FlashCardForm from "../components/FlashCardForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function FlashCardPage() {
  // Back End
  const [allCards, setAllCards] = useState([]);

  // Exclusivo para "Estudo"
  const [studyCards, setStudyCards] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [createMode, setCreateMode] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedFlashCard, setSelectedFlashCard] = useState(null);

  const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);

  useEffect(() => {
    // apiGetAllFlashcards().then((allFlashCards) => {
    //   setAllCards(allFlashCards);
    // });

    async function getAllCards() {
      try {
        const backEndAllCards = await apiGetAllFlashcards();
        setAllCards(backEndAllCards);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        setError(error.message);
      }
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

  async function handleDeleteFlashCard(cardId) {
    try {
      //Back End
      await apiDeleteFlashcard(cardId);

      //Front End
      setAllCards(allCards.filter((card) => card.id !== cardId));
      setError("");
      toast.success("Card Excluído com sucesso!");
    } catch (error) {
      setError(error.message);
    }
  }

  function handleEditFlashCard(card) {
    setCreateMode(false);
    handleTabSelect(1);
    setSelectedFlashCard(card);
  }

  function handleNewFlashCard() {
    setCreateMode(true);
    setSelectedFlashCard(null);
  }

  function handleTabSelect(tabIndex) {
    setSelectedTab(tabIndex);
  }

  async function handlePersist(title, description) {
    if (createMode) {
      try {
        //Back End
        const handleNewFlashCard = await apiCreateFlashcard(title, description);

        //Front End
        setAllCards([...allCards, handleNewFlashCard]);
        setError("");
        toast.success(`Card "${title}" incluído com sucesso!`);
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        //Back end
        await apiUpdateFlashcard(selectedFlashCard.id, title, description);

        //Front End
        setAllCards(
          allCards.map((card) => {
            if (card.id === selectedFlashCard.id) {
              return { ...card, title, description };
            }
            return card;
          })
        );

        setSelectedFlashCard(null);
        setCreateMode(true);
        setError("");
        toast.success(`Card "${title}" alterado com sucesso!`);
      } catch (error) {
        setError(error.message);
      }
    }
  }

  let mainJsx = (
    <div className="flex justify-center my-4">
      <Loading />
    </div>
  );

  if (error) {
    mainJsx = <Error />;
  }

  if (!loading && !error) {
    mainJsx = (
      <>
        <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect}>
          <TabList>
            <Tab>Listagem</Tab>
            <Tab>Cadastro</Tab>
            <Tab>Estudo</Tab>
          </TabList>

          <TabPanel>
            {allCards.map((flashCard) => {
              return (
                <FlashCardItem
                  key={flashCard.id}
                  onDelete={handleDeleteFlashCard}
                  onEdit={handleEditFlashCard}
                >
                  {flashCard}
                </FlashCardItem>
              );
            })}
          </TabPanel>
          <TabPanel>
            <div className="my-4">
              <Button onButtonClick={handleNewFlashCard}>
                Novo Flash Card
              </Button>
            </div>
            <FlashCardForm createMode={createMode} onPersist={handlePersist}>
              {selectedFlashCard}
            </FlashCardForm>
          </TabPanel>
          <TabPanel>
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
          </TabPanel>
        </Tabs>
      </>
    );
  }

  return (
    <>
      <ToastContainer />
      <Header>react-flash-cards-v3</Header>

      <Main>{mainJsx}</Main>
    </>
  );
}
