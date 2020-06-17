import { connect } from 'react-redux';
import Home from './home';
import { openModal, closeModal } from '../../actions/modal_actions';
import { fetchMessages, createMessage } from '../../actions/message_actions';
import { fetchUsers, createUser } from '../../actions/user_actions'
import { fetchContactTypes } from '../../actions/contact_type_actions'; 


const mapStateToProps = (state) => ({
  messages: state.entities.messages,
  currentUserId: state.session.currentUser.id,
  users: state.entities.users,
  contactTypes: state.entities.contactTypes
});

const mapDispatchToProps = (dispatch) => ({
  fetchMessages: () => (dispatch(fetchMessages())),
  createMessage: (messageData) => (dispatch(createMessage(messageData))),
  fetchUsers: () => (dispatch(fetchUsers())),
  createUser: (userData) => (dispatch(createUser(userData))),
  openModal: (option) => (dispatch(openModal(option))),
  closeModal: () => (dispatch(closeModal())),
  fetchContactTypes: () => dispatch(fetchContactTypes())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
