import { connect } from 'react-redux';
import AddUser from './add_user';
import { fetchUsers, createUser } from '../../actions/user_actions';

const mSTP = state => {
    return {
    };
};

const mDTP = dispatch => {
    return {
        createUser: userData => dispatch(createUser(userData)),
    };
};

export default connect(mSTP, mDTP)(AddUser);
