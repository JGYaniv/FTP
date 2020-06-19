const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateContactInput(data){
  let errors = {};

  data.phone = validText(data.phone) ? data.phone : "";

  if (Validator.isEmpty(data.phone)){
    errors.phone = "Phone number is required";
  }

  if (!Validator.isLength(data.phone, 10)){
    errors.phone = "Wrong number of characters";
  }

  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  for (i=0; i<data.phone.length; i++){
    if (!numbers.includes(data.phone[i])){
      errors.phone = "Not a valid phone number";
      break
    }
  }

  if (Validator.isEmpty(data.contactType)){
    errors.contactType = "Contact type is required";
  }
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}