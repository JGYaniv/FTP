import { RECEIVE_ALL_CONTACTS, RECEIVE_CONTACT } from '../actions/contact_actions';

const contactReducer = (state = 0, action) => {
  Object.freeze(state)

  switch (action.type) {
    case RECEIVE_ALL_CONTACTS:
      return action.contacts;
    case RECEIVE_CONTACT:
      let contactNum = state;
      contactNum += 1;
      return contactNum;
    default:
      return state;
  };
};

export default contactReducer;
