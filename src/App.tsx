import React from "react";
import { routeMap } from "../localRouteMap";
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
