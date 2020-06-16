import { RECEIVE_CONTACT_TYPE_ERRORS, RECEIVE_CONTACT_TYPE } from '../actions/contact_type_actions';

const contactTypeErrorsReducer = (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CONTACT_TYPE_ERRORS:
      return action.errors;
    case RECEIVE_CONTACT_TYPE:
      return [];
    default:
      return state;
  }
};

export default contactTypeErrorsReducer;
