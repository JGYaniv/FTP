const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Message = require('../../models/Message');
const validateMessageInput = require('../../validation/messages');

const sendMessage = require('../../modules/sms_gateway');

router.get("/test", (req, res) => res.json({ msg: "This is the messages route" }));

router.get("/", (req, res) => {
  Message.find()
    .sort({ date: -1 })
    .then(messages => res.json(messages))
    .catch(err => res.status(404).json({ noMessagesFound: "No messages found." }));
});

router.post('/',
  // passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateMessageInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newMessage = new Message({
      authorId: req.body.authorId, 
      text: req.body.text,
      contactType: req.body.contactType
    });

    sendMessage(req.body.text, "+16463699986")
      .then(msg => console.log("Success"))
      .catch(err => console.log("Error"));

    newMessage.save().then(message => res.json(message));
  }
);

module.exports = router;