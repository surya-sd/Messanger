import React from "react";
import { Switch, Route } from "react-router-dom";
import { Login } from "./Components/Login";
import { Chats } from "./Components/Chats";
function App() {
  return (
    <>
      <Switch>
        <Route path="/chats">
          <Chats />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </>
  );
}

export default App;
