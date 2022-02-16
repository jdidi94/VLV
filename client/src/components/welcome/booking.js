import { React, useEffect, useState } from "react";
// import agent from './agent'
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import { Route, Switch } from 'react-router-dom';
const Booking = () => {
  const [value, onChange] = useState(new Date());
  useEffect(() => {
    console.log(value);
  });
  return (
    <div className="booking">
      <Calendar onChange={onChange} value={value} />
    </div>
  );
};

export default Booking;
