import { RECEIVE_MESSAGE_ERRORS, RECEIVE_MESSAGE } from '../actions/message_actions';

const messageErrorsReducer = (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_MESSAGE_ERRORS:
      return action.errors;
    case RECEIVE_MESSAGE:
      return [];
    default:
      return state;
  }
};

export default messageErrorsReducer;
