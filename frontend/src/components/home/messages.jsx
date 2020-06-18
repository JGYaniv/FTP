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
        // this.forceUpdate();
    }

    render() {
      let contactTypes = this.props.contactTypes ? this.props.contactTypes.map(
        (type, i) => <option key={i} value={type.name}>{type.name}</option>) : []

      return (
        <div className="messages-container">
          <h1>Send Message</h1>

          <form onSubmit={this.handleSubmit}>
            <textarea
              onChange={this.update("text")}
              maxLength="140"
              placeholder="Message content... (140 max char)"
              value={this.state.text}></textarea>

            <select value={this.state.contactType} onChange={this.update("contactType")}>
              <option disabled value="">
                Send To:
              </option>
              {contactTypes}
            </select>

            <button className="basic-btn message-btn">SEND</button>
          </form>
        </div>
      );
    }
}

export default Messages;
