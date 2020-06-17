const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const secretOrKey = process.env.secretOrKey ? process.env.secretOrKey : require("../../config/keys").secretOrKey;
const Contact = require('../../models/Contact');
const validateContactInput = require('../../validation/contacts');

router.get('/', 
  passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Contact.find()
        .sort({date: -1})
        .then(contacts => res.json(contacts))
        .catch(err => res.status(404).json({ nocontactsfound: 'No tweets found' }));
});

router.get('/count', 
  passport.authenticate('jwt', { session: false }), 
    (req, res) => {
      Contact.countDocuments()
        .then(count => res.json({count}))
});


router.get('/:id', 
  passport.authenticate('jwt', { session: false }),
    (req,res) => {
      Contact.findById(req.params.id)
      .then(contact => res.json(contact))
      .catch(err => res.status(404).json({ nocontactfound: 'No contact found with that id'}) )
});

router.post('/',

  passport.authenticate('jwt', {session: false} ),
  (req, res) => {
    const {errors, isValid } = validateContactInput(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newContact = new Contact({
      phone: req.body.phone,
      contactType: req.body.contactType,
    });

    newContact.save().then(contact => {console.log(res.json(contact))});
  }
);

router.post('/bulk',

  passport.authenticate('jwt', {session: false} ),
  (req, res) => {

    const allContacts = JSON.parse(req.body.contacts); 
    const contactsCreated = [];
    const contactFailures = [];
    debugger
    allContacts.forEach( (contact,idx) =>
      
      {const {errors, isValid } = validateContactInput(contact);
    
      if (!isValid) {
        errors.idx = idx;
        contactFailures.push(errors);
        return res.status(400).json(errors);
  
      }  

      {const newContact = new Contact({
        phone: contact.phone, 
        contactType: contact.contactType
      })  

      newContact.save()
        .then(contact => { 
          contactsCreated.push(contact)})
      }

    })
    console.log(contactFailures);
  }
);


router.delete('/:id', (req, res) => {
  passport.authenticate('jwt', { session: false }),
    Contact.findByIdAndDelete(req.params.id)
      .then( () => res.json({msg: 'Contact deleted'}) )
      .catch(err => res.status(400).json(err))
});

module.exports = router; 