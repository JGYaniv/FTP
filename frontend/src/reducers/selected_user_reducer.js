import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal_actions';

const selectedUserIdReducer = (state = null, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return action.id || null;
        case CLOSE_MODAL:
            return null;
        default:
            return state;
    }
}

export default selectedUserIdReducer;