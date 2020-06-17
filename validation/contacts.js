const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateContactInput(data){
  let errors = {};

  data.phone = validText(data.phone) ? data.phone : "";

  if (Validator.isEmpty(data.phone)){
    errors.phone = "Phone number is required";
  }

  if (Validator.isEmpty(data.contactType)){
    errors.contact_type = "Contact type is required";
  }
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}