import Header from "./components/Header";

export default function App() {
  console.log('Teste no console do navegador')

  const name = "Gabriel";
  const age = 24;

  return (
    <>
      <Header>
        Componente Header - projeto react-hello
      </Header>


      <main>
        <div className="container mx-auto p-4">
          <p>O seu nome é {name} e você possui {age} anos.</p>
        </div>
      </main>
    </>
  )
}
