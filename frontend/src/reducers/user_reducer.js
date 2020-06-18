import { RECEIVE_ALL_USERS, RECEIVE_USER, REMOVE_USER } from '../actions/user_actions';

const userReducer = (state = [], action) => {
  Object.freeze(state);
  const newState = state.slice();
  switch (action.type) {
    case RECEIVE_ALL_USERS:
      return action.users.data;
    case RECEIVE_USER:
      newState.push(action.user.data)
      return newState;
    case REMOVE_USER:
      return newState.filter(user => user._id !== action.userId);
    default:
      return state;
  }
};

export default userReducer;
