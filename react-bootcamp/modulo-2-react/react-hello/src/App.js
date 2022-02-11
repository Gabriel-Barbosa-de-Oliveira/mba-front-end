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
        <p>O seu nome é Gabriel e você possui 24 anos.</p>
      </Main>
      <Test number={10} string="Teste" visible data={{ a: 1, b: 2 }} onClick={() => {
        console.log('click')
      }}></Test>
    </>
  )
}
