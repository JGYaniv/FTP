import { connect } from 'react-redux';
import ManageContactTypes from './manage_contact_types';
import { fetchContactTypes, createContactType, updateContactType, deleteContactType, fetchContactTypeCount } from '../../actions/contact_type_actions';
import { fetchContacts } from '../../actions/contact_actions';

const mSTP = state => {
  return {
    contactTypes: state.entities.contactTypes,
    contactTypeCount: state.entities.contactTypeCount
  };
};

const mDTP = dispatch => {
  return {
    fetchContactTypes: () => dispatch(fetchContactTypes()),
    createContactType: typeData => dispatch(createContactType(typeData)),
    updateContactType: (typeData, typeId) => dispatch(updateContactType(typeData, typeId)),
    deleteContactType: (typeName, typeId) => dispatch(deleteContactType(typeName, typeId)),
    fetchContacts: () => dispatch(fetchContacts()),
    fetchContactTypeCount: typeName => dispatch(fetchContactTypeCount(typeName))
  };
};

export default connect(mSTP, mDTP)(ManageContactTypes);
