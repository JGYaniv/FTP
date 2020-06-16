const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Contact = require('../../models/Contact');
const validateContactInput = require('../../validation/contacts');

router.get('/', (req, res) => {
  Contact.find()
    .sort({date: -1})
    .then(contacts => res.json(contacts))
    .catch(err => res.status(404).json({ nocontactsfound: 'No tweets found' }));
});

router.get('/:id', (req,res) => {
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
      contact_type: req.body.contact_type,
    });

    newContact.save().then(contact => {console.log(res.json(contact))});
  }
);


router.delete('/:id', (req, res) => {
  Contact.findByIdAndDelete(req.params.id)
    .then( () => res.json({msg: 'Contact deleted'}) )
    .catch(err => res.status(400).json(err))
});

module.exports = router; 