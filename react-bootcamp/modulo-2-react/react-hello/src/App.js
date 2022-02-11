import Header from "./components/Header";
import Main from "./components/Main";
import Test from "./components/Test";

export default function App() {


  return (
    <>
      <Header size="large">
        Componente Header - projeto react-hello
      </Header>
      <Main>
        <label htmlFor="inputName">Digite seu nome: </label>
        <input id="inputName" className="border" type='text' />
        <p>O seu nome é Gabriel e você possui 24 anos.</p>
      </Main>
    </>
  )
}
