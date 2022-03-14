import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { getUserEndpoint, IUser } from "./components/backend";
import { authContext } from "./components/authContext";
import { LoginScreen } from "./components/LoginScreen";
import Main from "./components/Main";

function App() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getUserEndpoint().then(setUser, onSignOut);
  }, []);

  function onSignOut() {
    setUser(null);
  }
  if (user) {
    return (
      <authContext.Provider value={{ user, onSignOut }}>
        <Router>
          <Switch>
            <Route path="/despesas/:mes">
              <Main />
            </Route>
            <Redirect to={{ pathname: "/despesas/" + "2021-01" }} />
          </Switch>
        </Router>
      </authContext.Provider>
    );
  } else {
    return <LoginScreen onSignIn={setUser} />;
  }
}

export default App;
