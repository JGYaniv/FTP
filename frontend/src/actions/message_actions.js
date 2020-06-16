import * as MessageAPIUtil from '../util/message_api_util';

export const RECEIVE_ALL_MESSAGES = "RECEIVE_ALL_MESSAGES";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const RECEIVE_MESSAGE_ERRORS = "RECEIVE_MESSAGE_ERRORS";

const receiveAllMessages = messages => {
  return {
    type: RECEIVE_ALL_MESSAGES,
    messages
  };
};

const receiveMessage = message => {
  return {
    type: RECEIVE_MESSAGE,
    message
  };
};

const receiveMessageErrors = errors => {
  return {
    type: RECEIVE_MESSAGE_ERRORS,
    errors
  }
}

export const fetchMessages = () => dispatch => {
  return MessageAPIUtil.fetchMessages()
    .then(messages => dispatch(receiveAllMessages(messages)),
    err => console.log(err));
};

export const createMessage = messageData => dispatch => {
  return MessageAPIUtil.createMessage(messageData)
    .then(message => dispatch(receiveMessage(message)),
      err => console.log(err));
      // err => dispatch(receiveMessageErrors(err.response.data)));
};
