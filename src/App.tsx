import React from "react";
import logo from "./logo.svg";
import "./App.css";
import routeMap from "./router";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <Switch>
      {routeMap.map((item, index) => (
        <Route
          key={index}
          path={item.path}
          component={item.component}
          exact={item.exact || false}
        />
      ))}
    </Switch>
  );
}

export default App;
