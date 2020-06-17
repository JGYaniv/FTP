import { combineReducers } from 'redux';
import SessionErrorsReducer from './session_errors_reducer';
import messageErrorsReducer from './message_errors_reducer';
import contactErrorsReducer from './contact_errors_reducer';
import userErrorsReducer from './user_errors_reducer';

export default combineReducers({
    session: SessionErrorsReducer,
    message: messageErrorsReducer,
    contact: contactErrorsReducer,
    user: userErrorsReducer 
});