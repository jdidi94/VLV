import { React, useState, useEffect } from "react";
import agent from "../../agent";
import Auth from "../../services/auth-services";
import { connect } from "react-redux";
import {
  UPDATE_FIELD_AUTH,
  GOOGLE_LOGIN,
  REGISTER,
  REGISTER_PAGE_UNLOADED,
  GOOGLE_LOGIN_PAGE_UNLOADED,
} from "../../constants/actionTypes";
import { GoogleLogin } from "react-google-login";

const Register = (props) => {
  const [color, setColor] = useState("white");
  const [error, setError] = useState("");
  const [colorPass, setColorPass] = useState("white");
  const [errorPass, setErrorPass] = useState("");
  const [errorPassrepeat, setErrorPassrepeat] = useState("");
  // const [colorPassRepeat, setColorPassrepeat] = useState("white");
  // const [repeatPassword, setRepeatPassword] = useState("");
  const [registerInput, setRegisterInput] = useState({
    username: "",
    password: "",
    repeatPassword: "",
    email: "",
  });
  const handleRegisterChange = (e) => {
    const { id, value } = e.target;

    setRegisterInput((registerInput) => ({ ...registerInput, [id]: value }));
  };
  useEffect(() => {
    setErrorPass(Auth.checkPasswordValidation(registerInput.password));
    setErrorPassrepeat(
      Auth.comparePassword(registerInput.password, registerInput.repeatPassword)
    );

    if (Auth.checkEmailValidation(registerInput.email) === true) {
      setError("Done");
      setColor("green");
    } else if (Auth.checkEmailValidation(registerInput.email) === false) {
      setError("Please enter a valid email");
      setColor("red");
    } else if (errorPass === "strong") {
      setColorPass("green");
    } else if (errorPass === "medium") {
      setColorPass("orange");
    } else if ((errorPass === "weak") | "please enter your password") {
      setColorPass("red");
    }
  }, [
    registerInput.email,
    registerInput.password,
    registerInput.repeatPassword,
    errorPass,
  ]);

  const submitForm = (username, email, password, repeatPassword) => (e) => {
    e.preventDefault();
    // console.log("all", username, email, password, repeatPassword);
    // console.log("repeatPassword", password, repeatPassword);
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
  const responseGoogleSuccess = (res) => {
    props.onSubmitGoogle(res.tokenId);
  };
  const responseGoogleError = (err) => {
    console.log("googleErr", err);
  };
  return (
    <section className="login">
      <form
        className="login__form"
        onSubmit={submitForm(
          registerInput.username,
          registerInput.email,
          registerInput.password,
          registerInput.repeatPassword
        )}
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
          id="username"
          value={registerInput.username}
          placeholder="Your name..."
          onChange={handleRegisterChange}
          required
          maxLength="60"
        />
        <br />
        <input
          className="login__form--input"
          type="email"
          id="email"
          name="email"
          value={registerInput.email}
          placeholder="Your email..."
          onChange={handleRegisterChange}
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
          id="password"
          placeholder="Your password..."
          required
          maxLength="60"
          onChange={handleRegisterChange}
          value={registerInput.password}
        />
        <p style={{ color: colorPass }} className="login-error-pass">
          {errorPass}
        </p>
        <input
          className="login__form--input"
          type="password"
          name="repeatPassword"
          id="repeatPassword"
          value={registerInput.repeatPassword}
          placeholder="Confirm password..."
          onChange={handleRegisterChange}
          required
        />
        <p className="login-error">{errorPassrepeat}</p>

        <button
          className="login__form--button"
          type="submit"
          disabled={props.inProgress}
        >
          Sign up
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
              Sign up with Google
            </button>
          )}
        />

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
  onChangeEmail: (key, value) =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: key, value }),
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
  onSubmitGoogle: (tokenId) =>
    dispatch({
      type: GOOGLE_LOGIN,
      payload: agent.user.googleLogin(tokenId),
    }),
  onUnload: () => dispatch({ type: REGISTER_PAGE_UNLOADED }),
  onUnloadGoogle: () => dispatch({ type: GOOGLE_LOGIN_PAGE_UNLOADED }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Register);
