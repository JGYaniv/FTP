import React from 'react';
import manageContactTypesCSS from './managecontacttypes.css';

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

  // componentDidMount() {
  //   this.props.fetchContactTypes();
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
            <i onClick={() => this.setState({ clicked: "edit", name: contact.name, contactTypeId: contact._id })} className="fas fa-edit"></i>
            <i onClick={() => this.props.deleteContactType(contact._id)} className="fas fa-trash-alt"></i>
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
            <button className="basic-btn add-contact-btn" onClick={this.handleAddClick}>Add Contact</button>
          </div>
          {contactItem}
          
        </div>
      );
    } else if (this.state.clicked === "add") {
      return (
        <div className="manage-contact-types-edit">
          <h1>Add Contact Type</h1>
          <input type="text"
            placeholder="Enter Contact Type"
            onChange={this.update} />

          <div>
            <button className="basic-btn" onClick={() => {
              this.props.createContactType(contactTypeData);
              this.setState({ clicked: "", name: ""  });
              }}>ADD</button>
            <button className="basic-btn" onClick={() => {
              this.setState({ clicked: "", name: "" });
            }}>BACK</button>
          </div>

        </div>
      );
    } else if (this.state.clicked === "edit") {
      return (
      <div className="manage-contact-types-edit">
        <h1>Edit Contact Type</h1>
        <input type="text"
          placeholder="Enter Contact Type"
          onChange={this.update}
          value={this.state.name} />

          <div>
            <button className="basic-btn" onClick={() => {
              this.props.updateContactType(contactTypeData, this.state.contactTypeId);
              this.setState({ clicked: "", name: ""  });
              }}>EDIT</button>

            <button className="basic-btn" onClick={() => {
              this.setState({ clicked: "", name: "" });
            }}>BACK</button>
        </div>

      </div>
    )
    } else {
      return null;
    }
  }
};

export default ManageContactTypes;
