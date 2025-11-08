import React from "react";
import { Route, Switch } from "wouter";
import FileUploadExcel from "./Components/FileUploadExcel";
import GameRow from "./Components/GameCell";

const App = () => {
  return (
    <Switch>
      <Route path="/">
        <FileUploadExcel />
      </Route>

      <Route path="/gamerow">
        <GameRow />
      </Route>

      {/* باش لمن يهبّط على رابط موش موجود */}
      <Route>
        <div style={{ padding: 20, color: "red", textAlign: "center" }}>
          Page not found
        </div>
      </Route>
    </Switch>
  );
};

export default App;
