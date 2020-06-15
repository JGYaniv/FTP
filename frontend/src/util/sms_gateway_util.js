const twilioAccountSid = require('../../../config/keys').twilioAccountSid;
const twilioAuthToken = require('../../../config/keys').twilioAuthToken;
const client = require('twilio')(twilioAccountSid, twilioAuthToken);

export const sendMessage = (body, phoneNumber) => (
    client.messages
        .create({
            body: body,
            from: "+12026839082",
            to: phoneNumber
        })
        .then(message => console.log(message))
        .catch(message => console.log(message))
);