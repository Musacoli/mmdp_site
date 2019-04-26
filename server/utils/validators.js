import bcrypt from 'bcryptjs';

const PasswordValidator = require('password-validator');

const validator = new PasswordValidator();

export const passwordvalidator = (password) => {
  validator
    .is()
    .min(8)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits()
    .has()
    .not()
    .spaces();
  return validator.validate(password);
};

export const hasPassword = (password) => bcrypt.hashSync(password, 10);

export const usernamevalidator = (username) => {
  if (username.length < 5) {
    return true;
  }
};

export const phoneNumberValidator = (phoneNo) => {
  const phoneRegEx = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;
  if (phoneNo.match(phoneRegEx)) {
    return true;
  }
};
