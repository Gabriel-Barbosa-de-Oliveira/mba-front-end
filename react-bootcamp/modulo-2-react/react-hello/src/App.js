import Header from "./components/Header";
import Main from "./components/Main";
import Test from "./components/Test";

export default function App() {

  let name = "Gabriel Barbosa"

  return (
    <>
      <Header size="large">
        Componente Header - projeto react-hello
      </Header>
      <Main>
        <input className="border" type='text' value={name} />
        <p>O seu nome é Gabriel e você possui 24 anos.</p>
      </Main>
    </>
  )
}
