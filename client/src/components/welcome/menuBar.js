import React from "react";
// import agent from './agent'

// import { Route, Switch } from 'react-router-dom';
const MenuBar = () => {
  return <header id="header">
    <nav className="header__main-nav">
        <input type="checkbox" />
      
        <div className="header__main-nav--hamburger"><div></div></div>
        <div className="header__main-nav--menu">
          <div>
            <div>
              <ul>
                <li><a href="home">Home</a></li>
                <li><a href="home">Villas</a></li>
                <li><a href="home">About</a></li>
                <li><a href="home">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
        {/* <!-- Logo and Content Container --> */}
         <div className="header__logo__content"> 
           <a href='home' className="header__logo__content--logo"
          ><span>V</span>L<span>V</span></a>
            <div className="header__auth">
         <a  href='Register' className="header__logo__content--content__link"
            >Register</a>
         <a  href='Login' className="header__logo__content--content__link header__logo__auth__link"
            >Login</a>
        </div>
            {/* <!-- Content --> */}
           <div className="header__logo__content--content">
          <h1 className="header__logo__content--content__title">Relax Your Soul</h1>
          <p className="header__logo__content--content__para">
            The team of VLV welcomes you. Start relaxing your soul and enjoy
            your stay.
          </p>
          <a  href='home' className="header__logo__content--content__link"
            >Discover More</a>
        </div>
         </div>
      </header>

};

export default MenuBar;