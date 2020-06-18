import { connect } from 'react-redux';
import EditUser from './edit_user';
import { fetchUsers, updateUser } from '../../actions/user_actions';

const mSTP = state => {
    return {
        selectedUser: state.entities.users.find(user => user._id === state.ui.selectedUserId)
    };
};

const mDTP = dispatch => {
    return {
        fetchUsers: () => dispatch(fetchUsers()),
        updateUser: (userData, userId) => dispatch(updateUser(userData, userId)),
    };
};

export default connect(mSTP, mDTP)(EditUser);
