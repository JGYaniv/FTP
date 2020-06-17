import { combineReducers } from 'redux';

import modalReducer from './modal_reducer';
import selectedUserIdReducer from './selected_user_reducer';

export default combineReducers({
  modal: modalReducer,
  selectedUserId: selectedUserIdReducer
});

