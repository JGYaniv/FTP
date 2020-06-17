import { connect } from 'react-redux';
import Home from './home';
import { openModal, closeModal } from '../../actions/modal_actions';
import { fetchMessages, createMessage } from '../../actions/message_actions';
<<<<<<< HEAD
import { fetchUsers, createUser } from '../../actions/user_actions'
import { fetchContactTypes } from '../../actions/contact_type_actions'; 

=======
import { fetchUsers, createUser } from '../../actions/user_actions';
import { fetchContactTypes } from '../../actions/contact_type_actions';
>>>>>>> c9f87303d30c3283e5a514466e8af5ae4ed445c2

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
<<<<<<< HEAD
  openModal: (option) => (dispatch(openModal(option))),
  closeModal: () => (dispatch(closeModal())),
  fetchContactTypes: () => dispatch(fetchContactTypes())
=======
  fetchContactTypes: () => dispatch(fetchContactTypes()),
  openModal: (option, id) => (dispatch(openModal(option, id))),
  closeModal: () => (dispatch(closeModal()))
>>>>>>> c9f87303d30c3283e5a514466e8af5ae4ed445c2
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
