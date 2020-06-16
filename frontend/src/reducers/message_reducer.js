import { RECEIVE_ALL_MESSAGES, RECEIVE_MESSAGE } from '../actions/message_actions';

const messageReducer = (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ALL_MESSAGES:
      return action.messages.data;
    case RECEIVE_MESSAGE:
      const newState = state.slice();
      newState.unshift(action.message.data);
      return newState;
    default:
      return state;
  }
};

export default messageReducer;
