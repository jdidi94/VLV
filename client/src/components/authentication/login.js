import { React, useState, useEffect } from "react";
import agent from "../../agent";
import { GoogleLogin } from "react-google-login";
import { connect } from "react-redux";
import ListErrors from "./listerrors";
import {
  GOOGLE_LOGIN,
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED,
  GOOGLE_LOGIN_PAGE_UNLOADED,
} from "../../constants/actionTypes";
// import { Route, Switch } from 'react-router-dom';
const Login = (props) => {
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginInput((loginInput) => ({ ...loginInput, [name]: value }));
  };
  const submitForm = (email, password) => (e) => {
    e.preventDefault();
    props.onSubmit(email, password);
  };
  useEffect(() => {}, [props.errors]);
  const responseGoogleSuccess = (res) => {
    props.onSubmitGoogle(res.tokenId);
  };
  const responseGoogleError = (err) => {
    console.log("googleErr", err);
  };
  return (
    <section className="login">
      <form
        onSubmit={submitForm(loginInput.email, loginInput.password)}
        className="login__form"
      >
        <div className="logo-content">
          <a href="/" className="header__logo__content--logo">
            <span>V</span>L<span>V</span>
          </a>
        </div>
        <input
          className="login__form--input"
          type="email"
          name="email"
          value={loginInput.email}
          placeholder="Your email..."
          onChange={handleLoginChange}
          required
          maxLength="60"
        />
       
        <br />
        <input
          className="login__form--input"
          type="password"
          name="password"
          placeholder="Your password..."
          required
          maxLength="60"
          onChange={handleLoginChange}
          value={loginInput.password}
        />

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
        <GoogleLogin
          clientId="261881368887-r96i6dvmjv2olaodl8t54gh66o9ovu2n.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseGoogleSuccess}
          onFailure={responseGoogleError}
          cookiePolicy={"single_host_origin"}
          render={(renderProps) => (
            <button
              className="login__form--button"
              onClick={renderProps.onClick}
            >
              Login with Google
            </button>
          )}
        />
        <ListErrors listerrors={props.errors} />
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
  onSubmitGoogle: (tokenId) =>
    dispatch({
      type: GOOGLE_LOGIN,
      payload: agent.user.googleLogin(tokenId),
    }),
  onUnload: () => dispatch({ type: LOGIN_PAGE_UNLOADED }),
  onUnloadGoogle: () => dispatch({ type: GOOGLE_LOGIN_PAGE_UNLOADED }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
