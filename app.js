const express = require("express");
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const db = process.env.mongoURI ? process.env.mongoURI : require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
const passport = require('passport');
const User = require('./models/User');
const users = require('./routes/api/users');
const messages = require('./routes/api/messages');
const contacts = require('./routes/api/contacts');
const contactTypes = require('./routes/api/contact_types')

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./config/passport')(passport);

app.use("/api/users", users);
app.use("/api/messages", messages);

app.use("/api/contacts", contacts);
app.use("/api/contact_types", contactTypes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}