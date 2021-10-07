import React from "react";
import Map from '../Map/Map';
import useStyles from "./style";
import {Switch, Route,} from "react-router-dom";

function App() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Switch>
        <Route path="/about">
          <div>About</div>
        </Route>
        <Route path="/">
          <>
            <div>We are work!!</div>
            <Map/>
          </>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
