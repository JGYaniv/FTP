const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  contactType: {
    type: String,
    default: "General"
  },
  date: {
    type: Date,
    default: Date.now
  },
  count: {
    type: Number, 
    default: 0
  }

});

module.exports = Message = mongoose.model('Message', MessageSchema);