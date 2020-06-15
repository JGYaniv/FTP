const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }, 
  admin: {
    type: Boolean,
    default: false
  }
});

module.exports = User = mongoose.model('User', UserSchema);