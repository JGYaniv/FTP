const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateMessageInput(data) {
  let errors = {};

  data.text = validText(data.text) ? data.text : '';

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text is required';
  }

  if (!Validator.isLength(data.text, { max: 160 })) {
    errors.text = 'Text must be less than 160 characters';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}
