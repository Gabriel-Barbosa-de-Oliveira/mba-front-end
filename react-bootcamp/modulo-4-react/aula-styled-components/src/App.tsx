import "./App.css";
import styled from "styled-components";

const StyleHeader = styled.h1`
  color: #3636e9;
  font-size: 42px;
`;

const StyleData = styled("p")`
  font-size: 24px;
  font-weight: 700;
  color: #8d8dff;
`;

const StyleButton = styled.button`
  background-color: transparent;
  border-radius: 8px;
  border: 1px solid black;
  padding: 8px 16px;
  cursor: pointer;
`;

const StyleSuccessButton = styled(StyleButton)`
  border-color: green;
  color: green;
`;

const StyleFailedButton = styled(StyleButton)`
  border-color: red;
  color: red;
`;

function App() {
  return (
    <div className="App">
      <StyleHeader>Gabriel Barbosa de Oliveira</StyleHeader>
      <StyleData>barbosagabrieloliveira@hotmail.com</StyleData>
      <StyleData>(12) 99239-9504</StyleData>
      <StyleData>Brasil</StyleData>

      <StyleSuccessButton>Adicionar</StyleSuccessButton>
      <StyleFailedButton>Remover</StyleFailedButton>
      <StyleButton>Detalhes</StyleButton>
    </div>
  );
}

export default App;
