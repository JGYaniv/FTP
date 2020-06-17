import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import ModalCSS from './modal.css'
import AddUser from './add_user'
// import ManageContacts from '../../components/modal/manage_contacts'
import CreateContact from './create_contact'
// import BulkUploadContacts from '../../components/modal/bulk_upload_contacts'
import ManageContactTypesContainer from '../home/manage_contact_types_container';
import { createUser } from '../../actions/user_actions';

function Modal({modal, closeModal, createUser}) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case 'addUser':
      component = <AddUser createUser={createUser}/>
      break;
    // case 'manageContacts':
    //   component = <ManageContacts />;
    //   break;
    case 'createContact':
      component = <CreateContact />;
      break;
    // case 'bulkUploadContacts':
    //   component = <bulkUploadContacts />;
    //   break;
    case 'manageTypes':
      component = <ManageContactTypesContainer />
      break;
    default:
      return null;
  }
  
  return (
    <div className="modal-background" onMouseDown={closeModal}>
      <div className="modal-child" onMouseDown={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal()),
    createUser: (user) => dispatch(createUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
