const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Contact = require('../../models/Contact');
const validateContactTypeInput = require('../../validation/contactTypes');
const ContactType = require("../../models/ContactType");
const { json } = require("body-parser");

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


router.delete('/delete/:name', 
  passport.authenticate('jwt', {session: false} ),
  (req, res) => {
    Contact.deleteMany({"contactType": req.params.name})
      .then((ContactType.deleteOne({"name": req.params.name}))
        .catch(err => res.status(400).json({msg: "CT not found"})))     
      .catch(err => res.status(400).json(err))
      .then( (result) => res.json(result) )
});

router.get('/count/:name', 
  passport.authenticate('jwt', {session: false} ),  
  (req,res) => {

    Contact.countDocuments({"contactType": req.params.name})
      .then(result => res.json(result)) 
      .catch(err => res.status(400).json(err))
  }
);


router.patch('/edit/:name', 
  passport.authenticate('jwt', {session: false} ),
  (req, res) => {
  
    Contact.find({"contactType": req.params.name})
      .then(contacts => Promise.all(contacts.forEach(contact=> {
        contact.contactType = req.body.name;
        contact.save();
      })
      .catch(e => res.status(400).send("contacts didn't edit"))
      ))
      .then(
        ContactType.findOne({"name": req.params.name})
          .then(ct => {
            ct.name = req.body.name;
            ct.save()
              .then(ct => res.json(ct))
              .catch(e => res.status(400).json(e))
          })
      )

});


module.exports = router; 

