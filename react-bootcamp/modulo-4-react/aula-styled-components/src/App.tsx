import "./App.css";
import styled, { css } from "styled-components";

const StyleHeader = styled.h1`
  color: #3636e9;
  font-size: 42px;
`;

const StyleData = styled("p")`
  font-size: 24px;
  font-weight: 700;
  color: #8d8dff;
`;

type TStyledButtonProps = {
  variant?: "success" | "failed";
};

const StyleButton = styled.button<TStyledButtonProps>`
  background-color: transparent;
  border-radius: 8px;
  border: 1px solid black;
  padding: 8px 16px;
  cursor: pointer;

  ${(props) => {
    if (props.variant === "success") {
      return css`
        border-color: green;
        color: green;
      `;
    }
    if (props.variant === "failed") {
      return css`
        border-color: red;
        color: red;
      `;
    }
  }};
`;

function App() {
  return (
    <div className="App">
      <StyleHeader>Gabriel Barbosa de Oliveira</StyleHeader>
      <StyleData>barbosagabrieloliveira@hotmail.com</StyleData>
      <StyleData>(12) 99239-9504</StyleData>
      <StyleData>Brasil</StyleData>

      <StyleButton variant="success">Adicionar</StyleButton>
      <StyleButton style={{ marginLeft: "8px" }} variant="failed">
        Remover
      </StyleButton>
      <StyleButton style={{ marginLeft: "8px" }}>Detalhes</StyleButton>
    </div>
  );
}

export default App;
