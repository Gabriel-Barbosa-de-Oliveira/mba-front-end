import "./App.css";
import styled, { css, keyframes, ThemeProvider } from "styled-components";
import { useState } from "react";

const StyleHeader = styled.h1`
  color: ${(props) => props.theme.main};
  font-size: 42px;
`;

const StyleData = styled("p")`
  font-size: 24px;
  font-weight: 700;
  color: ${(props) => props.theme.secondary};
`;

type TStyledButtonProps = {
  variant?: "success" | "failed";
};

const RotateKeyFrame = keyframes` 
  from {
    transform: rotate(0deg)
  }

  to {
    transform: rotate(360deg)
  }
`;

const themeBlue = {
  main: "blue",
  secondary: "#8d8dff",
};

const themeRed = {
  main: "red",
  secondary: "#ff4343",
};

const StyleButton = styled.button<TStyledButtonProps>`
  background-color: transparent;
  border-radius: 8px;
  border: 1px solid black;
  padding: 8px 16px;

  :hover {
    cursor: pointer;
    background-color: #f2f2f2;
  }

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
  const [theme, setTheme] = useState(themeBlue);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <StyleHeader>Gabriel Barbosa de Oliveira</StyleHeader>
        <div>
          <StyleButton onClick={() => setTheme(themeBlue)}>
            Set Blue Theme
          </StyleButton>
          <StyleButton
            style={{ marginLeft: "8px" }}
            onClick={() => setTheme(themeRed)}
          >
            Set Red Theme
          </StyleButton>
        </div>
        <StyleData>barbosagabrieloliveira@hotmail.com</StyleData>
        <StyleData>(12) 99239-9504</StyleData>
        <StyleData>Brasil</StyleData>

        <StyleButton variant="success">Adicionar</StyleButton>
        <StyleButton style={{ marginLeft: "8px" }} variant="failed">
          Remover
        </StyleButton>
        <StyleButton style={{ marginLeft: "8px" }}>Detalhes</StyleButton>
      </ThemeProvider>
    </div>
  );
}

export default App;
