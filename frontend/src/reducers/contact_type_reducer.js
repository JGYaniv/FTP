import { RECEIVE_ALL_CONTACT_TYPES, RECEIVE_CONTACT_TYPE, REMOVE_CONTACT_TYPE } from '../actions/contact_type_actions';

const contactTypeReducer = (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ALL_CONTACT_TYPES:
      return action.contactTypes.data;
    case RECEIVE_CONTACT_TYPE:
      const newState = state.slice();
      newState.push(action.contactType.data)
      return newState;
    case REMOVE_CONTACT_TYPE:
      const newState = state.slice();
      delete newState[action.contactTypeId];
      return newState;
    default:
      return state;
  }
};

export default contactTypeReducer;
