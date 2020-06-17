import { connect } from 'react-redux';
import DeleteUser from './delete_user';
import { deleteUser } from '../../actions/user_actions';

const mSTP = state => {
    return {
        users: state.entities.users,
        selectedUser: state.entities.users.find(user => user._id === state.ui.selectedUserId)
    };
};

const mDTP = dispatch => {
    return {
        deleteUser: userId => dispatch(deleteUser(userId)),
    };
};

export default connect(mSTP, mDTP)(DeleteUser);
