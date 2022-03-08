import React from "react";
import "./App.css";
import Main from "./components/Main";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/despesas/:mes">
          <Main />
        </Route>
        <Redirect to={{ pathname: "/despesas/" + "2021-01" }} />
      </Switch>
    </Router>
  );
}

export default App;
