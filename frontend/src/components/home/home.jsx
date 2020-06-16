import React from 'react';
import HomeCSS from './home.css';
import Organizers from './organizers';
import Contacts from './contacts';
import Messages from './messages';
import MessageLog from './messagelog';

class Home extends React.Component {
  render() {
    return (
      <div className="home-container">
        <Organizers/>

      <div className="contact-message-container">
          <Contacts openModal={this.props.openModal}/>

          <Messages createMessage={this.props.createMessage}
            currentUserId={this.props.currentUserId} />
      </div>

        <MessageLog messages={this.props.messages}
          fetchMessages={this.props.fetchMessages} />
      </div>
    )
  }
} 


export default Home;
