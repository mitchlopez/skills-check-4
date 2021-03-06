import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "./components/Auth";

export default (
  <Switch>
    <Route component={Auth} path="/auth" />
  </Switch>
);
