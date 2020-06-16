const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  phone: {
    type: String, 
    required: true
  },

  contact_type: {
    type: String, 
    default: "general"
  }

});

module.exports = Contact = mongoose.model("Contact", ContactSchema);