import React from 'react';
import HomeCSS from './home.css';
import Organizers from './organizers';
import Contacts from './contacts';
import Messages from './messages';
import MessageLog from './messagelog';

class Home extends React.Component {
  componentWillMount() {
    this.props.fetchContactTypes();
    this.props.fetchMessages();
    this.props.fetchContacts();
  }

  render() {
    return (
      <div className="home-container">
        <Organizers openModal={this.props.openModal}
        fetchUsers={this.props.fetchUsers}
        createUser={this.props.createUser}
        users={this.props.users}/>

      <div className="contact-message-container">
          <Contacts openModal={this.props.openModal}
            contacts={this.props.contacts}/>

          <Messages createMessage={this.props.createMessage}
            contactTypes={this.props.contactTypes}
            currentUserId={this.props.currentUserId} />
      </div>

        <MessageLog messages={this.props.messages}
          users={this.props.users} />

          <footer className="home-footer">
            copyright boomerlee, yahnev, AK47, dobberman
          </footer>
      </div>
    )
  }
} 


export default Home;
