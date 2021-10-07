import React from "react";
import useStyles from "./style";
import {Switch, Route,} from "react-router-dom";
import Controller from "../Controller/Controller";

function App() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Switch>
        <Route path="/about">
          <div>About</div>
        </Route>
        <Route path="/">
          <Controller/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
