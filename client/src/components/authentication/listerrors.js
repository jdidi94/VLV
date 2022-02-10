import React from "react";
// import agent from './agent'

// import { Route, Switch } from 'react-router-dom';
const ListErrors = (props) => {
  return (
    <div className="login-error" style={{ color: "red" }}>
      {props.listerrors}
    </div>
  );
};

export default ListErrors;
