import React from "react";
import Header from "../components/Header";
import Investments from "../components/Investments";
import Main from "../components/Main";

export default function InvestimentsPage() {
  return (
    <div>
      <Header>react-investments v1.0.1</Header>
      <Main>
        <Investments></Investments>
      </Main>
    </div>
  );
}
