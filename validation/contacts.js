const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateContactInput(data){
  let errors = {};

  data.phone = validText(data.phone) ? data.phone : "";

  if (Validator.isEmpty(data.phone)){
    errors.phone = "Phone number is required";
  }

<<<<<<< HEAD
  if (Validator.isEmpty(data.contactType)){
    errors.contactType = "Contact type is required";
=======
  if (Validator.isEmpty(data.contact_type)){
    errors.contact_type = "Contact type is required";
>>>>>>> c9f87303d30c3283e5a514466e8af5ae4ed445c2
  }
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
}