const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  phone: {
    type: String, 
    required: true
  },

  contactType: {
    type: String, 
    default: "general",
    index: true,
    // unique: true
  }

});

module.exports = Contact = mongoose.model("Contact", ContactSchema);