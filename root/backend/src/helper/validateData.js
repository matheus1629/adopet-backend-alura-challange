const regexFullName = /^.{2,}\s+.{2,}$/;

export const validateFirstName = (firstName) => {
    console.log(firstName)
  const firstNameTrim = firstName.trim();

  if (!firstNameTrim && firstNameTrim < 2) {
    throw new Error("Invalid first name");
  }
};
