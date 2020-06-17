import { RECEIVE_ALL_CONTACTS, RECEIVE_CONTACT, RECEIVE_CONTACTS } from '../actions/contact_actions';

const contactReducer = (state = 0, action) => {
  Object.freeze(state)

  switch (action.type) {
    case RECEIVE_ALL_CONTACTS:
      return action.contacts;
    case RECEIVE_CONTACT:
      return state + 1
    case RECEIVE_CONTACTS:
      return state + action.contactsNum
    default:
      return state;
  };
};

export default contactReducer;
