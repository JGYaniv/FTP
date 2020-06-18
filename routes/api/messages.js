const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Contact = require('../../models/Contact');
const Message = require('../../models/Message');
const validateMessageInput = require('../../validation/messages');
const encryptor = require('../../modules/encryptor');
const hiddenKey = process.env.hiddenKey ? process.env.hiddenKey : require('../../config/keys').hiddenKey;

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
    const contactType = req.body.contactType;
    const text = req.body.text;
    if (!isValid) {
      return res.status(400).json(errors);
    }

    let prom = Contact.find({contactType: contactType})
      .then(contacts => {
        return Promise.all(contacts.map(contact => {
          let phone = "+1" + encryptor(hiddenKey).decrypt(contact.phone);
          sendMessage(text, phone)
        }, e => console.log(e)))})
      prom.then(messages => {
        // const successCounter = messages.filter(msg => !msg.errorCode).length;
        // const failureCounter = messages.length - successCounter;
        
        const messageParams = {
          authorId: req.body.authorId, 
          text: req.body.text,
          contactType: req.body.contactType
        }

        Message.create(messageParams)
          .then(message => res.json({...message._doc}))
          // .then(message => res.json({...message._doc, successCounter, failureCounter }))
          .catch(err => res.status(500).send({ message: 'error creating message homie' }));
       
      })
      .catch(error => res.status(400).send({message: `unable to retrieve contact of type:${req.body.contactType}`}))
  }
);

router.get('/sample', (req,res) => {
  Contact.find({contactType: "tester2"})
    .then(contacts => { res.json(contacts)

    })


})

module.exports = router;