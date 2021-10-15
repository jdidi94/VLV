import { React } from "react";
import agent from "../../agent";

import { connect } from "react-redux";
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED,
} from "../../constants/actionTypes";
// import { Route, Switch } from 'react-router-dom';
const Login = (props) => {
  const email = props.email;
  const password = props.password;
  const analyseEmail = (e) => {
    props.onChangeEmail(e.target.value);
  };
  const analysePassword = (e) => {
    props.onChangePassword(e.target.value);
  };
  const submitForm = (email, password) => (e) => {
    e.preventDefault();
    props.onSubmit(email, password);
  };
  return (
    <section className="login">
      <form onSubmit={submitForm(email, password)} className="login__form">
        <div className="logo-content">
          <a href="/" className="header__logo__content--logo">
            <span>V</span>L<span>V</span>
          </a>
        </div>
        <input
          className="login__form--input"
          type="email"
          name="email"
          value={email}
          placeholder="Your email..."
          onChange={analyseEmail}
          required
          maxLength="60"
        />
        <p className="login-error">error</p>
        <input
          className="login__form--input"
          type="password"
          name="password"
          placeholder="Your password..."
          required
          maxLength="60"
          onChange={analysePassword}
          value={password}
        />
        <p className="login-error-pass">errorPass</p>
        <p className="login__form--forgotp">
          <a className="login-link" href="/signup">
            Forgot password
          </a>
        </p>
        <button
          className="login__form--button"
          type="submit"
          disabled={props.inProgress}
        >
          Login
        </button>
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
const mapStateToProps = (state) => ({ ...state.auth });
const mapDispatchToProps = (dispatch) => ({
  onChangeEmail: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "email", value }),
  onChangePassword: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "password", value }),
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: agent.user.login(email, password) }),
  onUnload: () => dispatch({ type: LOGIN_PAGE_UNLOADED }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
