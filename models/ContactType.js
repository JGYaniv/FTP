const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const ContactTypeSchema = new Schema({
  name: {
    type: String, 
    required: true
  },

}); 


module.exports = ContactType = mongoose.model("ContactType", ContactTypeSchema);