import { connect } from 'react-redux';
import Home from './home';
import { fetchMessages, createMessage } from '../../actions/message_actions';

const mapStateToProps = (state) => ({
  messages: state.entities.messages,
  currentUserId: state.session.currentUser.id,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMessages: () => (dispatch(fetchMessages())),
  createMessage: (messageData) => (dispatch(createMessage(messageData)))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
