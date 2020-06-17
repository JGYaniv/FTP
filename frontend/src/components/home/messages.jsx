import React from 'react';
import MessagesCSS from './messages.css'

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authorId: this.props.currentUserId,
            text: "",
            contactType: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        const message = this.state;
        this.props.createMessage(message);
        this.setState({ text: "", contactType: "" });
    }

    render() {
<<<<<<< HEAD
      let contactTypes = this.props.contactTypes ? this.props.contactTypes.map(
        (type) => <option value={type.name}>{type.name}</option>) : []

      return (
        <div className="messages-container">
          <h1>Send Message</h1>

          <form onSubmit={this.handleSubmit}>
            <textarea
              onChange={this.update("text")}
              placeholder="Message content..."
              value={this.state.text}
            ></textarea>

            <select>
              <option disabled defaultValue>
                Send To:
              </option>
              {contactTypes}
            </select>

            <button>Send</button>
          </form>
        </div>
      );
=======
        return (
            <div className="messages-container">
                <h1>Send Message</h1>
    
                <form onSubmit={this.handleSubmit}>
                    <textarea onChange={this.update("text")} 
                        placeholder="Message content... (Max 140 char)"
                        maxLength="140"
                        className="form-control"
                        value={this.state.text}></textarea>
    
                    <select>
                        <option disabled defaultValue>Send To:</option>
                        <option value="general">General</option>
                        <option value="medic">Medic</option>
                    </select>
    
                    <button className="basic-btn message-btn">SEND</button>
                </form>
            </div>
        )
>>>>>>> c9f87303d30c3283e5a514466e8af5ae4ed445c2
    }
}

export default Messages;
