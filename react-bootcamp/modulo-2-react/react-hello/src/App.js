import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Test from "./components/Test";
import TextInput from "./components/TextInput";

export default function App() {

  // const state = useState('Gabriel');
  // const name = state[0];
  // const setName = state[1];

  const [name, setName] = useState('Gabriel');

  //Clojure

  function handleNameChange(name) {
    const newName = name;
    setName(newName)
  }

  return (
    <>
      <Header size="large">
        Componente Header - projeto react-hello
      </Header>
      <Main>
        <TextInput labelDescription="Digite o seu nome:" inputValue={name} onInputChange={handleNameChange} />
        <p>O seu nome é {name}, com {name.length} caracteres, e você possui 24 anos.</p>
      </Main>
    </>
  )
}
