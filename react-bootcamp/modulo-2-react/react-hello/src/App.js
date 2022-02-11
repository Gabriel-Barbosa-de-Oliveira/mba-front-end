import { useEffect, useState } from "react";
import CheckBoxInput from "./components/CheckBoxInput";
import DateInput from "./components/DateInput";
import Header from "./components/Header";
import Main from "./components/Main";
import Test from "./components/Test";
import TextInput from "./components/TextInput";
import Timer from "./components/Timer";
import { getAgeFrom } from "./helpers/dateHelpers";
import { getNewId } from "./services/idService";

export default function App() {

  // const state = useState('Gabriel');
  // const name = state[0];
  // const setName = state[1];

  const [name, setName] = useState('Gabriel');
  const [birthDate, setBirthDate] = useState('1997-05-22');
  const [showTimer, setShowTimer] = useState(false);

  useEffect(() => {
    //Depois que renderiza o use effect é chamado 
    //se chamar sem deps. fica executando cada vez que tem alteração na pagina
    document.title = name
  }, [name])

  //Clojure

  function handleNameChange(name) {
    const newName = name;
    setName(newName)
  }

  function handleBirthDateChange(date) {
    const newDate = date;
    setBirthDate(newDate)
  }

  function toggleShowTimer() {
    setShowTimer(!showTimer)
  }

  return (
    <>
      <Header size="large">
        Componente Header - projeto react-hello
      </Header>
      <Main>
        {
          showTimer && (<div className="text-right m-4">
            <Timer />
          </div>)
        }

        <CheckBoxInput labelDescription="Mostrar Cronometro" onCheckboxChange={toggleShowTimer} />
        <TextInput id={getNewId()} autoFocus labelDescription="Digite o seu nome:" inputValue={name} onInputChange={handleNameChange} />
        <DateInput id={getNewId()} labelDescription="Digite a sua data de nascimento:" inputValue={birthDate} onInputChange={handleBirthDateChange} />
        <p>O seu nome é {name}, com {name.length} caracteres, e você possui {getAgeFrom(birthDate)} anos.</p>
      </Main>
    </>
  )
}
