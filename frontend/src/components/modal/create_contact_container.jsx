import { connect } from 'react-redux';
import CreateContact from './create_contact';
import { createContact } from '../../actions/contact_actions';
import { closeModal } from '../../actions/modal_actions';

const mSTP = state => {
  return {
    contactTypes: state.entities.contactTypes,
  };
};

const mDTP = dispatch => {
  return {
    createContact: contactData => dispatch(createContact(contactData)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mSTP, mDTP)(CreateContact);
