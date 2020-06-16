const twilioAccountSid = require('../config/keys').twilioAccountSid;
const twilioAuthToken = require('../config/keys').twilioAuthToken;
const client = require('twilio')(twilioAccountSid, twilioAuthToken);

module.exports = sendMessage = (body, phoneNumber) => (
    client.messages
        .create({
            body: body,
            from: "+12026839082",
            to: phoneNumber
        })
)