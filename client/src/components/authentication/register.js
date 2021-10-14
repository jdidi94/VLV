import React from "react";
// import agent from './agent'

// import { Route, Switch } from 'react-router-dom';
const Register = () => {
  return (
    <section className="login">
      <form className="login__form">
        <div className="logo-content">
          <a href="/" className="header__logo__content--logo">
            <span>V</span>L<span>V</span>
          </a>
        </div>
        <input
          className="login__form--input"
          type="email"
          name="email"
          placeholder="Your email..."
          required
        />
        <p className="login-error">email should have 5 characterzs</p>
        <input
          className="login__form--input"
          type="password"
          name="password"
          placeholder="Your password..."
          required
        />
        <p className="login-error">email should have 5 characterzs</p>
        <input
          className="login__form--input"
          type="password"
          name="repeatpassword"
          placeholder="Confirm password..."
          required
        />
        <p className="login-error">email should have 5 characterzs</p>

        <button className="login__form--button">Sign up</button>
        <button className="login__form--login-google">
          Sign up with Google
        </button>

        <p className="login__form--account">
          you have an account{" "}
          <a className="login-link" href="/login">
            Sign in
          </a>
        </p>
      </form>
    </section>
  );
};

export default Register;
