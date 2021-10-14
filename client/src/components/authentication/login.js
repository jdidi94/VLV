import React from "react";
// import agent from './agent'

// import { Route, Switch } from 'react-router-dom';
const Login = () => {
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
        <p className="login__form--forgotp">
          <a className="login-link" href="/signup">
            Forgot password
          </a>
        </p>
        <button className="login__form--button">Login</button>
        <button className="login__form--login-google">
          Sign in with Google
        </button>

        <p className="login__form--account">
          you don't have an account{" "}
          <a className="login-link" href="/register">
            Sign up
          </a>
        </p>
      </form>
    </section>
  );
};

export default Login;
