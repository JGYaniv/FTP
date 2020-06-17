const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Contact = require('../../models/Contact');
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
  // passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateMessageInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newMessage = new Message({
      authorId: req.body.authorId, 
      // authorId: "5ee7d16dccef6335a14d7023",
      text: req.body.text,
      contactType: req.body.contactType
    });

    // debugger
    // const contacts = await Contact.find({ contactType: req.body.contactType }); // contacts will be array of contacts
    // const { sentMessages, errors } = await sendMessages(contacts);


    // const sendMessages = async (contacts) => {
    //   return contacts.map(async contact => {
    //     const message = await sendMessage(req.body.text, "+1" + contact.phone)
        
    //   })
    // }
    //
    Contact.find({contactType: req.body.contactType})
      .then(contacts => Promise.all(contacts.map(contact => sendMessage(req.body.text, "+1" + contact.phone))))
      .then(messages => {
        // messages [{ twilioMsgData }, { error }, ]
        const successCounter = messages.filter(msg => !msg.errorCode).length;
        const failureCounter = messages.length - successCounter;
        // debugger 
        const messageParams = {
          authorId: "5ee7d16dccef6335a14d7023", // update this later //should now be avail in req.body.authorId
          text: req.body.text,
          contactType: req.body.contactType
        }
        Message.create(messageParams)
          .then(message => res.json({...message, successCounter, failureCounter }))
          .catch(err => res.status(500).send({ message: 'error creating message homie' }));
        // newMessage.save().then(message => {
        //   res.json({...message, successCounter, failureCounter }); 
        // })
      })
      .catch(error => res.status(400).send({message: `unable to retrieve contact of type:${req.body.contactType}`}))
      

  }
);

router.get('/sample', (req,res) => {
  Contact.find({contactType: "test"})
    // .then(contacts => console.log(contacts))
    .then(contacts => { res.json(contacts)

    })


})

module.exports = router;