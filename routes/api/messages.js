const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Message = require('../../models/Message');
const validateMessageInput = require('../../validation/messages');

const sendMessage = require('../../modules/sms_gateway');

router.get("/test", (req, res) => res.json({ msg: "This is the messages route" }));

router.get("/", 
  passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Message.find()
        .sort({ date: -1 })
        .then(messages => res.json(messages))
        .catch(err => res.status(404).json({ noMessagesFound: "No messages found." }));
  });

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateMessageInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newMessage = new Message({
      authorId: req.body.authorId, 
      // authorId: "5ee7d16dccef6335a14d7023", (PASS THROUGH FRONT END)
      text: req.body.text,
      contactType: req.body.contactType
    });

    // ONCE CONTACTS BACKEND IS BUILT, ITERATE THROUGH AND ONLY SEND TO SPECIFIC CONTACT TYPE
    // DECRYPTION OF PHONE NUMBERS IN ITERATION
    sendMessage(req.body.text, "+16463699986")
      .then(msg => console.log("Success"))
      .catch(err => console.log("Error"));

    newMessage.save().then(message => res.json(message));
  }
);

module.exports = router;