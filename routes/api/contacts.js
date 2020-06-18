const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const secretOrKey = process.env.secretOrKey ? process.env.secretOrKey : require("../../config/keys").secretOrKey;
const Contact = require('../../models/Contact');
const validateContactInput = require('../../validation/contacts');
const encryptor = require('../../modules/encryptor');
const { json } = require("body-parser");
const hiddenKey = process.env.hiddenKey ? process.env.hiddenKey : require('./config/keys').hiddenKey;

router.get('/', 
  passport.authenticate('jwt', { session: false }),
    (req, res) => {
      Contact.find()
        .sort({date: -1})
        .then(contacts => res.json(contacts))
        .catch(err => res.status(404).json({ nocontactsfound: 'No contacts found' }));
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

  // passport.authenticate('jwt', {session: false} ),
  (req, res) => {
    const {errors, isValid } = validateContactInput(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    }
    
    const contactParams = {
      phone: encryptor(hiddenKey).encrypt(req.body.phone), 
      contactType: req.body.contactType,
    };
    
    Contact.create(contactParams)
      .then(contact => res.json(contact))
  
  }
);

// const createContact = new Promise(
//   contactParams => Contact.create(contactParams) 
// )

router.post('/bulk',

  // passport.authenticate('jwt', {session: false} ),
  (req, res) => {
    const allContacts = JSON.parse(req.body.contacts); 
    let countFailures = 0;
    Promise.all(allContacts.map( (contact) =>
      
      {
        const {errors, isValid } = validateContactInput(contact);
    
      if (!isValid) {
        countFailures++;
        return Promise.resolve(true);
      }  

      const contactParams = {
        phone: encryptor(hiddenKey).encrypt(contact.phone), 
        contactType: contact.contactType,
      };
      
      Contact.create(contactParams)
        .catch(err => countFailures++);

    }))
    .then(() => res.json({countCreated: allContacts.length-countFailures, countFailures}))
    
    // console.log(contactFailures);
  }
);


router.delete('/:id', (req, res) => {
  passport.authenticate('jwt', { session: false }),
    Contact.findByIdAndDelete(req.params.id)
      .then( () => res.json({msg: 'Contact deleted'}) )
      .catch(err => res.status(400).json(err))
});

module.exports = router; 