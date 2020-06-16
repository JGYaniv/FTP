import React from 'react';
import HomeCSS from './home.css';
import Organizers from './organizers';
import Contacts from './contacts';
import Messages from './messages';
import MessageLog from './messagelog';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="home-container">
        <Organizers/>

      <div className="contact-message-container">
          <Contacts openModal={this.props.openModal}/>

          <Messages/>
      </div>

        <MessageLog/>
      </div>
    )
  }
} 


export default Home;
