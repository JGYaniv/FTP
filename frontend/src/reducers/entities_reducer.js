import { combineReducers } from 'redux';
import messageReducer from './message_reducer';

export default combineReducers({
  message: messageReducer
});
