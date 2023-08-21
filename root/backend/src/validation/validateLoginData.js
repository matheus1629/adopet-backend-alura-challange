const validateEmail = (email) => {
  const errors = [];

  if (!email) errors.push("Email is required");

  return errors;
};

const validatePassword = (password) => {
  const errors = [];

  if (!password) errors.push("Password is required");

  return errors;
};

export default {
  validateEmail,
  validatePassword,
};
