import { combineReducers } from 'redux';
import messageReducer from './message_reducer';
import contactReducer from './contact_reducer';
import userReducer from './user_reducer';

export default combineReducers({
  messages: messageReducer,
  contacts: contactReducer,
  users: userReducer
});
