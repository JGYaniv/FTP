const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Contact = require('../../models/ContactType');
const validateContactTypeInput = require('../../validation/contactTypes');
const ContactType = require("../../models/ContactType");

router.get('/', 
  passport.authenticate('jwt', {session: false} ),
  (req, res) =>{
  
    ContactType.find()
      .then(contactTypes => res.json(contactTypes))
      .catch(err => res.status(404).json({nocontacttypesfound: 'No Contact Types found'}));
});

router.post('/', 

  passport.authenticate('jwt', {session: false} ),
  (req, res) => {
  const {errors, isValid } = validateContactTypeInput(req.body);
  
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newContactType = new ContactType({
    name: req.body.name
  });
  
  newContactType.save()
    .then(contactType => {console.log(res.json(contactType))});

}); 

router.delete('/:id', 
  passport.authenticate('jwt', {session: false} ),
  (req, res) => {

  ContactType.findByIdAndDelete(req.params.id)
    .then( () => res.json({msg: 'CT deleted'}) )
    .catch(err => res.status(400).json(err))

});


router.patch('/edit/:id', 
  passport.authenticate('jwt', {session: false} ),
  (req, res) => {

  ContactType.findById(req.params.id)
    .then(contactType => {
      contactType.name = req.body.name;
      contactType.save()
        .then(contactType => res.json(contactType))
        .catch(err => res.status(400).json(err))
      
    })
});


module.exports = router; 