import { connect } from 'react-redux';
import BulkUpload from './bulk_upload';
import { createBulkContacts } from '../../actions/contact_actions';
import { closeModal } from '../../actions/modal_actions';

const mSTP = state => {
  return {
    contactTypes: state.entities.contactTypes
  };
};

const mDTP = dispatch => {
  return {
    createBulkContacts: contactDataArr => dispatch(createBulkContacts(contactDataArr)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mSTP, mDTP)(BulkUpload);
