const { AuthValidationError } = require('../errors/AuthValidationError');
const { compare } = require('bcrypt');

const errorHandler = (e) => {
  let errors;

  if ('errors' in e) {
    errors = Object.keys(e.errors).map((key) => {
      return {
        path: e.errors[key].path,
        value: e.errors[key].value,
        message: e.errors[key].message,
      };
    });
  } else if (e instanceof AuthValidationError) {
    errors = e.errorMap();
  } else if (e.code && e.code === 11000) {
    Object.keys(e.keyValue).forEach((key) => {
      const constraintError = new AuthValidationError(
        key,
        e.keyValue[key],
        `This ${key} is already exists`,
      );
      errors = constraintError.errorMap();
    });
  }

  return errors;
};

const verifyPassword = async (password, savedPassword) => {
  const result = await compare(password, savedPassword);

  return result;
};

module.exports = { errorHandler, verifyPassword };
