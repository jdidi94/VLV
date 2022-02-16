import React from "react";
// import agent from './agent'
import Booking from "./booking";
import MenuBar from "./menuBar";
import Searching from "./searching";
// import { Route, Switch } from 'react-router-dom';
const Home = () => {
  return (
    <div className="container">
      <MenuBar />
      <Searching />
      <Booking />
    </div>
  );
};

export default Home;
