import { petSizes, states } from "../config/consts.js";
import { checkBufferType } from "../helpers/buffer.js";

const picture = (buffer) => {
  const errors = [];

  const bufferType = checkBufferType(buffer);
  if (bufferType !== "PNG" && bufferType !== "JPG") {
    errors.push("File must be PNG or JPEG");
  } else if (buffer.length > 5000000) {
    errors.push("File exceeds the maximum size of 5mb");
  }

  if (errors.length !== 0) return errors;
};

const firstName = (firstName) => {
  const errors = [];

  if (!firstName) {
    errors.push("First name is required");
  } else {
    const firstNameTrim = firstName.trim();
    if (firstNameTrim.length < 2 || firstNameTrim.length > 255) {
      errors.push("Invalid first name");
    }
  }

  if (errors.length !== 0) return errors;
};

const lastName = (lastName) => {
  const errors = [];

  if (!lastName) {
    errors.push("Last name is required");
  } else {
    const lastNameTrim = lastName.trim();
    if (lastNameTrim.length < 2 || lastNameTrim.length > 255) {
      errors.push("Invalid last name");
    }
  }

  if (errors.length !== 0) return errors;
};

const phoneNumber = (phoneNumber) => {
  const errors = [];

  if (!phoneNumber) {
    errors.push("Phone Number is required");
  } else if (!/^\d+$/.test(phoneNumber)) {
    errors.push("Phone Number only accepts numbers");
  } else {
    const phoneNumberTrim = phoneNumber.trim();
    if (phoneNumberTrim.length < 10 || phoneNumberTrim.length > 11) {
      errors.push("Invalid phone number ");
    }
  }

  if (errors.length !== 0) return errors;
};

const city = (city) => {
  const errors = [];

  if (!city) {
    errors.push("City is required");
  } else {
    const cityTrim = city.trim();
    if (cityTrim.length > 255) {
      errors.push("Invalid city");
    }
  }

  if (errors.length !== 0) return errors;
};

const state = (state) => {
  const errors = [];

  if (!state) {
    errors.push("State is required");
  } else {
    if (!states.includes(state)) {
      errors.push("Invalid state");
    }
  }

  if (errors.length !== 0) return errors;
};

const personalInfo = (personalInfo) => {
  const errors = [];

  if (personalInfo) {
    const personalInfoTrim = personalInfo.trim();
    if (personalInfoTrim.length > 2000) errors.push("Personal info too large");
  }

  if (errors.length !== 0) return errors;
};

const email = (email) => {
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

  if (errors.length !== 0) return errors;
};

const password = (password) => {
  const errors = [];

  if (!password) {
    errors.push("Password is required");
  } else {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,16}$/;
    if (!passwordRegex.test(password)) {
      errors.push("Invalid Password");
    }
  }
  if (errors.length !== 0) return errors;
};

const name = (name) => {
  const errors = [];

  if (!name) {
    errors.push("Pet's name is required");
  } else {
    const lastNameTrim = name.trim();
    if (lastNameTrim.length < 3) {
      errors.push("Pet's name is too short");
    }
  }

  if (errors.length !== 0) return errors;
};

const age = (age) => {
  const errors = [];

  const ageNumber = Number(age);

  if (!age && age != 0) {
    errors.push("Pet's age is required");
  } else if (ageNumber > 99 || ageNumber < 0 || !Number.isInteger(ageNumber)) {
    errors.push("Pet's age must be an integer value from 0 to 99");
  }

  if (errors.length !== 0) return errors;
};

const size = (size) => {
  const errors = [];

  if (!size) {
    errors.push("Pet's size is required");
  } else {
    if (!petSizes.includes(size.toLowerCase())) {
      errors.push("Invalid size");
    }
  }

  if (errors.length !== 0) return errors;
};

const description = (description) => {
  const errors = [];

  if (!description) {
    errors.push("Pet's description is required");
  } else {
    if (description.length > 25) {
      errors.push("Pet's description is too large");
    }
  }

  if (errors.length !== 0) return errors;
};

export default {
  firstName,
  lastName,
  phoneNumber,
  city,
  state,
  personalInfo,
  email,
  password,
  picture,
  name,
  age,
  size,
  description,
};
