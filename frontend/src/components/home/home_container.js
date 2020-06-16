import { connect } from 'react-redux';
import Home from './home';
// import { fetchMessages, createMessage } from '../../actions/message_actions';
import { openModal, closeModal } from '../../actions/modal_actions';

const mapStateToProps = (state) => ({
  // messages: state.entities.messages,
  // currentUserId: state.session.currentUser.id,
});

const mapDispatchToProps = (dispatch) => ({
  // fetchMessages: () => (dispatch(fetchMessages())),
  // createMessage: (messageData) => (dispatch(createMessage()))
  openModal: (option) => (dispatch(openModal(option))),
  closeModal: () => (dispatch(closeModal()))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
