const checkEmailValidation = (email) => {
  const regex =
    // eslint-disable-next-line
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (regex.test(email) === true) {
    return true;
  }
  return false;
};
export const checkPasswordValidation = (password) => {
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  const mediumRegex = new RegExp(
    "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
  );
  if (!password) {
    return "please enter your password";
  } else if (strongRegex.test(password) === true) {
    return "strong";
  } else if (mediumRegex.test(password) === true) {
    return "medium";
  } else if (
    strongRegex.test(password) === true &&
    mediumRegex.test(password) === true
  ) {
    return "medium";
  } else {
    return "weak";
  }
};
const comparePassword = (p, rp) => {
  if (p === rp) {
    return "Matched";
  }
  return "Not matched";
};

// eslint-disable-next-line
export default {
  checkEmailValidation: checkEmailValidation,
  checkPasswordValidation: checkPasswordValidation,
  comparePassword: comparePassword,
};
