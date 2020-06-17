import React from 'react';
import HomeCSS from './home.css';
import Organizers from './organizers';
import Contacts from './contacts';
import Messages from './messages';
import MessageLog from './messagelog';

class Home extends React.Component {
  componentDidMount() {
    this.props.fetchContactTypes();
  }

  render() {
    return (
      <div className="home-container">
        <Organizers openModal={this.props.openModal}
        fetchUsers={this.props.fetchUsers}
        createUser={this.props.createUser}
        users={this.props.users}/>

      <div className="contact-message-container">
          <Contacts openModal={this.props.openModal}/>

          <Messages createMessage={this.props.createMessage}
            contactTypes={this.props.contactTypes}
<<<<<<< HEAD
            fetchContactTypes={this.props.fetchContactTypes}
=======
>>>>>>> c9f87303d30c3283e5a514466e8af5ae4ed445c2
            currentUserId={this.props.currentUserId} />
      </div>

        <MessageLog messages={this.props.messages}
          fetchMessages={this.props.fetchMessages} />

          <footer>
            copyright boomerlee, yahnev, AK47, dobberman
          </footer>
      </div>
    )
  }
} 


export default Home;
