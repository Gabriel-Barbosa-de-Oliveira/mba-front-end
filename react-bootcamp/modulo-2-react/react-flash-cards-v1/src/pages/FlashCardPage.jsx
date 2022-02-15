import React from "react";
import FlashCard from "../components/FlashCard";
import Header from "../components/Header";
import Main from "../components/Main";
export default function FlashCardPage() {
  return (
    <>
      <Header>react-flash-cards-v1</Header>
      <Main>
        <FlashCard />
        <FlashCard title="React" description="Biblioteca para Front End" />
      </Main>
    </>
  );
}
