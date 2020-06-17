import { RECEIVE_ALL_CONTACT_TYPES, RECEIVE_CONTACT_TYPE, EDIT_CONTACT_TYPE, REMOVE_CONTACT_TYPE } from '../actions/contact_type_actions';

const contactTypeReducer = (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ALL_CONTACT_TYPES:
      return action.contactTypes.data;
    case RECEIVE_CONTACT_TYPE:
      return state.concat(action.contactType.data)
    case EDIT_CONTACT_TYPE:
      return state.map(contactType => {
        if (contactType._id === action.typeId) {
          return action.contactType.data;
        } else {
          return contactType;
        }
      });
    case REMOVE_CONTACT_TYPE:
      return state.filter(contactType => contactType._id !== action.contactTypeId);
    default:
      return state;
  }
};

export default contactTypeReducer;
