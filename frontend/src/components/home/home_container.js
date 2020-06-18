import { connect } from 'react-redux';
import Home from './home';
import { openModal, closeModal } from '../../actions/modal_actions';
import { fetchMessages, createMessage } from '../../actions/message_actions';
import { fetchUsers, createUser } from '../../actions/user_actions'
import { fetchContactTypes } from '../../actions/contact_type_actions'; 
import { fetchContacts } from '../../actions/contact_actions';


const mapStateToProps = (state) => ({
  messages: state.entities.messages,
  currentUserId: state.session.currentUser.id,
  users: state.entities.users,
  contactTypes: state.entities.contactTypes,
  contacts: state.entities.contacts
});

const mapDispatchToProps = (dispatch) => ({
  fetchMessages: () => (dispatch(fetchMessages())),
  createMessage: (messageData) => (dispatch(createMessage(messageData))),
  fetchUsers: () => (dispatch(fetchUsers())),
  createUser: (userData) => (dispatch(createUser(userData))),
  fetchContactTypes: () => dispatch(fetchContactTypes()),
  openModal: (option, id) => (dispatch(openModal(option, id))),
  closeModal: () => (dispatch(closeModal())),
  fetchContacts: () => dispatch(fetchContacts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
