import { RECEIVE_CONTACT_TYPE_COUNT } from '../actions/contact_type_actions';

const contactTypeCountReducer = (state = {}, action) => {
  Object.freeze(state);

  const newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_CONTACT_TYPE_COUNT:
      newState[action.typeName] = action.count;
      return newState;
    default:
      return state;
  }
};

export default contactTypeCountReducer;
