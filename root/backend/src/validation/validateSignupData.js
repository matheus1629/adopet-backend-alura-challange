const validatePhotoData = (base64) => {
  const errors = [];

  const fileSupported = ["image/jpeg;base64", "image/png;base64"];
  const extractData = base64.slice(
    base64.indexOf("data:") + "data:".length,
    base64.indexOf(",")
  );
  console.log(extractData)
  if (!fileSupported.includes(extractData)) {
    errors.push("File not supported");
  }

  return errors;
};

const validatePhotoSize = (buffer) => {
  const errors = [];

  const bufferSize = buffer.byteLength;

  if (bufferSize >= 16777215) {
    errors.push("Photo file is too large");
  }

  return errors;
};

const validateFirstName = (firstName) => {
  const errors = [];

  if (!firstName) {
    errors.push("First name is required");
  } else {
    const firstNameTrim = firstName.trim();
    if (firstNameTrim.length < 3) {
      errors.push("First name is too short");
    }
  }

  return errors;
};

const validateLastName = (lastName) => {
  const errors = [];

  if (!lastName) {
    errors.push("Last name is required");
  } else {
    const lastNameTrim = lastName.trim();
    if (lastNameTrim.length < 3) {
      errors.push("Last name is too short");
    }
  }

  return errors;
};

const validateTelephone = (telephone) => {
  const errors = [];

  if (!telephone) {
    errors.push("Telephone is required");
  } else {
    const telephoneTrim = telephone.trim();
    if (telephoneTrim.length < 10 || telephoneTrim.length > 11) {
      errors.push("Invalid telephone ");
    }
  }

  return errors;
};

const validateCity = (city) => {
  const errors = [];

  if (!city) {
    errors.push("City is required");
  } else {
    const telephoneTrim = city.trim();
    if (telephoneTrim.length > 255) {
      errors.push("Invalid city");
    }
  }

  return errors;
};

const validateState = (state) => {
  const errors = [];

  if (!state) {
    errors.push("State is required");
  } else {
    const stateTrim = state.trim();
    if (stateTrim.length !== 2) {
      errors.push("Invalid state");
    }
  }

  return errors;
};

const validatePersonalInfo = (personalInfo) => {
  const errors = [];

  if (personalInfo) {
    const personalInfo = personalInfo.trim();
    if (personalInfo.length > 2000) errors.push("Personal info too large");
  }

  return errors;
};

const validateEmail = (email) => {
  const errors = [];

  if (!email) {
    errors.push("Email is required");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailTrim = email.trim();
    if (!emailRegex.test(emailTrim)) {
      errors.push("Invalid email");
    }
  }

  return errors;
};

const validatePassword = (password) => {
  const errors = [];

  if (!password) {
    errors.push("Password is required");
  } else {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{6,15}$/;
    if (!passwordRegex.test(password)) {
      errors.push("Invalid Password");
    }
  }

  return errors;
};

export default {
  validateFirstName,
  validateLastName,
  validateTelephone,
  validateCity,
  validateState,
  validatePersonalInfo,
  validateEmail,
  validatePassword,
  validatePhotoSize,
  validatePhotoData,
};
