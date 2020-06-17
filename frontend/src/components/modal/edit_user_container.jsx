import { connect } from 'react-redux';
import EditUser from './edit_user';
import { updateUser } from '../../actions/user_actions';

const mSTP = state => {
    return {
        selectedUser: state.entities.users.find(user => user._id === state.ui.selectedUserId)
    };
};

const mDTP = dispatch => {
    return {
        updateUser: (userData, userId) => dispatch(updateUser(userData, userId)),
    };
};

export default connect(mSTP, mDTP)(EditUser);
