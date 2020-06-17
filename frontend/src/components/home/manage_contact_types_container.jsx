import { connect } from 'react-redux';
import ManageContactTypes from './manage_contact_types';
import { fetchContactTypes, createContactType, updateContactType, deleteContactType } from '../../actions/contact_type_actions';

const mSTP = state => {
  return {
    contactTypes: state.entities.contactTypes,
  };
};

const mDTP = dispatch => {
  return {
    fetchContactTypes: () => dispatch(fetchContactTypes()),
    createContactType: typeData => dispatch(createContactType(typeData)),
    updateContactType: (typeData, typeId) => dispatch(updateContactType(typeData, typeId)),
    deleteContactType: typeId => dispatch(deleteContactType(typeId)),
  };
};

export default connect(mSTP, mDTP)(ManageContactTypes);
