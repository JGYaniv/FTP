const twilioAccountSid = process.env.twilioAccountSid ? process.env.twilioAccountSid : require("../config/keys").twilioAccountSid;
const twilioAuthToken = process.env.twilioAuthToken ? process.env.twilioAuthToken : require("../config/keys").twilioAuthToken;
const client = require('twilio')(twilioAccountSid, twilioAuthToken);

module.exports = sendMessage = (body, phoneNumber) => {
    return client.messages
        .create({
            body: body,
            from: "+12026839082",
            to: phoneNumber
        })
        .catch(e => ({ status: e.status, errorCode: e.code }))
}

