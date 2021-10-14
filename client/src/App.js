import React from "react";
// import agent from './agent'
import Register from "./components/authentication/register";
import Home from "./components/welcome/home";
import Login from "./components/authentication/login";
import Profile from "./components/authentication/profile";
import "./App.css";

import { Route, Switch } from "react-router-dom";
const App = () => {
  return (
    <header className="App">
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </header>
  );
};

export default App;
