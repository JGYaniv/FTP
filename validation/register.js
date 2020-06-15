const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.email = validText(data.email) ? data.email : '';
  data.password = validText(data.password) ? data.password : '';
  data.passwordConfirm = validText(data.passwordConfirm) ? data.passwordConfirm : '';

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = 'Confirm Password field is required';
  }

  if (!Validator.equals(data.password, data.passwordConfirm)) {
    errors.passwordConfirm = 'Passwords must match';
  }

  // if (Validator.isEmpty(data.phone)) {
  //   errors.phone = 'Phone number is required';
  // }

  // if (!Validator.isLength(data.phone, { min: 10, max: 20 })) {
  //   errors.phone = 'Phone number must be at least 10 digits';
  // }

  // if (Validator.isEmpty(data.admin)) {
  //   errors.admin = 'Admin field is required';
  // }


  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
