const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const secretOrKey = process.env.secretOrKey ? process.env.secretOrKey : require("../../config/keys").secretOrKey;
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send({
    id: req.user.id,
    admin: req.user.admin,
    email: req.user.email
  });
})

router.get('/', 
  passport.authenticate('jwt', { session: false }),
    (req, res) => {
      User.find()
        .then(users => res.json(users))
        .catch(err => res.status(404).json({ noUsersFound: 'No users found'})
      )
});

router.post('/signup', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          email: req.body.email,
          password: req.body.password,
          phone: req.body.phone,
          admin: req.body.admin
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
});

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = 'User not found';
        return res.status(400).json(errors);
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              email: user.email,
              password: user.password,
              admin: user.admin,
            };

            jwt.sign(
              payload,
              secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                });
              }
            );
          } else {
            return res.status(400).json({ password: 'Incorrect password' });
          }
        });
    });
});

router.post('/', 
  passport.authenticate('jwt', { session: false }),
    (req, res) => {
      User.findOne({ email: req.body.email })
        .then(user => {
          if (user) {
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
          } else {
            const newUser = new User({
              email: req.body.email,
              password: req.body.password,
              phone: req.body.phone,
              admin: req.body.admin
            });
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          }
        });
});

router.delete('/:id', (req, res) => {
  passport.authenticate('jwt', { session: false }),
    Contact.findByIdAndDelete(req.params.id)
      .then( () => res.json({msg: 'User deleted'}) )
      .catch(err => res.status(400).json(err))
});

module.exports = router;