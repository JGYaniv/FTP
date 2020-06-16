import { connect } from 'react-redux';
import ManageContactTypes from './manage_contact_types';

const mSTP = state => {
  return {
    contacts: state.entities.contacts,
  };
};

const mDTP = dispatch => {
  return {

  };
};

export default connect(mSTP, mDTP)(ManageContactTypes);
