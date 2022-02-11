import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Test from "./components/Test";

export default function App() {

  // const state = useState('Gabriel');
  // const name = state[0];
  // const setName = state[1];

  const [name, setName] = useState('Gabriel');

  //Clojure

  function handleNameChange(event) {
    const newName = event.currentTarget.value;
    setName(newName)
  }

  return (
    <>
      <Header size="large">
        Componente Header - projeto react-hello
      </Header>
      <Main>
        <div className="flex flex-col my-4">
          <label htmlFor="inputName" className="text-sm mb-1">Digite seu nome: </label>
          <input autoFocus id="inputName" className="border p-1" type='text' value={name} onChange={handleNameChange} />
        </div>
        <p>O seu nome é {name}, com {name.length} caracteres, e você possui 24 anos.</p>
      </Main>
    </>
  )
}
