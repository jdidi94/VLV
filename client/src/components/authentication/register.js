import { React, useState } from "react";
import agent from "../../agent";
import Auth from "../../services/auth-services";
import { connect } from "react-redux";
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED,
} from "../../constants/actionTypes";

const Register = (props) => {
  const [color, setColor] = useState("white");
  const [error, setError] = useState("");
  const [colorPass, setColorPass] = useState("white");
  const [errorPass, setErrorPass] = useState("");
  const [errorPassrepeat, setErrorPassrepeat] = useState("");
  // const [colorPassRepeat, setColorPassrepeat] = useState("white");
  // const [repeatPassword, setRepeatPassword] = useState("");
  const username = props.username;
  const email = props.email;
  const password = props.password;
  const repeatPassword = props.repeatPassword;
  const analyseEmail = (e) => {
    if (Auth.checkEmailValidation(e.target.value) === true) {
      setError("Done");
      setColor("green");
    } else {
      setError("Please enter a valid email");
      setColor("red");
    }
    props.onChangeEmail(e.target.value);
  };
  const analysePassword = (e) => {
    setErrorPass(Auth.checkPasswordValidation(e.target.value));
    if (errorPass === "strong") {
      setColorPass("green");
    } else if (errorPass === "medium") {
      setColorPass("orange");
    } else if ((errorPass === "weak") | "please enter your password") {
      setColorPass("red");
    }
    props.onChangePassword(e.target.value);
  };
  const usernameChange = (e) => {
    props.onChangeUsername(e.target.value);
  };
  const analyseRepeeatPassword = (e) => {
    setErrorPassrepeat(Auth.comparePassword(password, e.target.value));
    // setRepeatPassword(e.target.value);
    props.onChangeRepeatPassword(e.target.value);
    // console.log();
  };

  const submitForm = (username, email, password, repeatPassword) => (e) => {
    e.preventDefault();
    console.log(
      "",
      Auth.comparePassword(password, repeatPassword) === "Matched"
    );
    console.log("repeatPassword", password, repeatPassword);
    if (
      Auth.checkEmailValidation(email) === true &&
      Auth.checkPasswordValidation(password) === "strong" &&
      Auth.comparePassword(password, repeatPassword) === "Matched"
    ) {
      props.onSubmit(username, email, password);
    } else {
      props.onUnload();
    }
  };
  return (
    <section className="login">
      <form
        className="login__form"
        onSubmit={submitForm(username, email, password, repeatPassword)}
      >
        <div className="logo-content">
          <a href="/" className="header__logo__content--logo">
            <span>V</span>L<span>V</span>
          </a>
        </div>
        <input
          className="login__form--input"
          type="text"
          name="username"
          value={username}
          placeholder="Your name..."
          onChange={usernameChange}
          required
          maxLength="60"
        />
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
        <p style={{ color: color }} className="login-error">
          {error}
        </p>
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
        <p style={{ color: colorPass }} className="login-error-pass">
          {errorPass}
        </p>
        <input
          className="login__form--input"
          type="password"
          name="repeatpassword"
          value={repeatPassword}
          placeholder="Confirm password..."
          onChange={analyseRepeeatPassword}
          required
        />
        <p className="login-error">{errorPassrepeat}</p>

        <button
          className="login__form--button"
          type="submit"
          disabled={props.inProgress}
        >
          Login
        </button>
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
const mapStateToProps = (state) => ({ ...state.auth });
const mapDispatchToProps = (dispatch) => ({
  onChangeEmail: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "email", value }),
  onChangePassword: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "password", value }),
  onChangeUsername: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "username", value }),
  onChangeRepeatPassword: (value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: "repeatPassword", value }),
  onSubmit: (username, email, password) =>
    dispatch({
      type: REGISTER,
      payload: agent.user.register(username, email, password),
    }),
  onUnload: () => dispatch({ type: REGISTER_PAGE_UNLOADED }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Register);
