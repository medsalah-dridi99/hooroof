import React from "react";
import { Route, Switch, Router } from "wouter";
import FileUploadExcel from "./Components/FileUploadExcel";
import GameRow from "./Components/GameCell";

const App = () => {
  return (
    <Router base="/hooroof">
      <Switch>
        <Route path="/">
          <FileUploadExcel />
        </Route>

        <Route path="/gamerow">
          <GameRow />
        </Route>

        <Route>
          <div style={{ padding: 20, color: "red", textAlign: "center" }}>
            Page not found
          </div>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
