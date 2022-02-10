import React from "react";
// import agent from './agent'


// import { Route, Switch } from 'react-router-dom';
const Searching = () => {
  return <div id="Searching">
  
    <label className="label__input"> <i className="fas fa-search"></i><input className='Searching__search--input'/></label>
  <div className='Searching__filterdropdown'>
  <button className="Searching__filterdropdown-dropbtn">Place &#65088;</button>
  <div className="Searching__filterdropdown__content">
    <a  className="Searching__filterdropdown__content--link"href="home">Hammamet</a>
    <a className="Searching__filterdropdown__content--link"href="home">Sousse</a>
    <a className="Searching__filterdropdown__content--link"href="home">Klebia</a>
  </div>
   </div>
   <div className="Searching__filterdropdown" >
    <button className="Searching__filterdropdown-dropbtn" >Sort by &#65088;</button>
  <div className="Searching__filterdropdown__content">
    <a className="Searching__filterdropdown__content--link" href="home">price</a>
    <a className="Searching__filterdropdown__content--link" href="home">Rate</a>
    <a className="Searching__filterdropdown__content--link" href="home">reviews</a>
  </div>
   
  </div>
     </div>
    
};

export default Searching;