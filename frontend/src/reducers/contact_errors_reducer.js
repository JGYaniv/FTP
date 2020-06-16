import { RECEIVE_CONTACT_ERRORS, RECEIVE_CONTACT } from '../actions/contact_actions';

const contactErrorsReducer = (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CONTACT_ERRORS:
      return action.errors;
    case RECEIVE_CONTACT:
      return [];
    default:
      return state;
  }
};

export default contactErrorsReducer;
