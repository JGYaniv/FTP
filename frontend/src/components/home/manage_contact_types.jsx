import React from 'react';
import manageContactTypesCSS from './manage_contact_types.css';
import EditContactTypes from './edit_contact_types';

class ManageContactTypes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: "",
      name: "",
      contactTypeId: ""
    };

    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.update = this.update.bind(this);
  }

  handleAddClick() {
    this.setState({ clicked: "add" });
  }

  handleEditClick() {
    this.setState({ clicked: "edit" });
  }

  componentDidMount() {
    this.props.fetchContactTypes();
  }

  // componentDidUpdate() {
  //   this.props.fetchContactTypes();
  //   return;
  // }

  update(e) {
    this.setState({ name: e.target.value });
  }


  render() {
    const contactTypeData = { name: this.state.name };
    const contactItem = this.props.contactTypes.map((contact, i) => {
      return (
        <div className="contact-type-item" key={i}>
          <p>
            {contact.name}
          </p>
          <p>
            # of contacts
          </p>
          <div className="contact-type-item-buttons">
            <button onClick={() => this.setState({ clicked: "edit", name: contact.name, contactTypeId: contact._id })}>
              Edit
            </button>
            <button onClick={() => this.props.deleteContactType(contact._id)} >
              Delete
            </button>
          </div>
        </div>
      )
    })
    if (!this.state.clicked) {
      return (
        <div className="manage-contact-types">
          <h1>Manage Contact Types</h1>
          <div className="manage-contact-types-header">
            <h3>Contact Type</h3>
            <h3># of Contacts</h3>
            <h3>Edit/Delete</h3>
          </div>
          {contactItem}
          <button onClick={this.handleAddClick}>+</button>
        </div>
      );
    } else if (this.state.clicked === "add") {
      return (
        <div className="manage-contact-types">
          <h1>Add Contact Type</h1>
          <input type="text"
            placeholder="Enter Contact Type"
            onChange={this.update} />
          <button onClick={() => {
            this.props.createContactType(contactTypeData);
            this.setState({ clicked: "", name: ""  });
            }}>Submit</button>
        </div>
      );
    } else if (this.state.clicked === "edit") {
      return (
      <div className="manage-contact-types">
        <h1>Edit Contact Type</h1>
        <input type="text"
          placeholder="Enter Contact Type"
          onChange={this.update}
          value={this.state.name} />
        <button onClick={() => {
            this.props.updateContactType(contactTypeData, this.state.contactTypeId);
            this.setState({ clicked: "", name: ""  });
            }}>Submit</button>
      </div>
    )
    } else {
      return null;
    }
  }
};

export default ManageContactTypes;
