import React from 'react';
import { parser } from '../../util/contact_api_util';
import BulkUploadCSS from './bulkupload.css';

class BulkUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stage: 1,
      phone: "",
      contactType: "",
    }

    this.handleCSVFile = this.handleCSVFile.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCSVFile(e) {
    e.preventDefault();
    const file = e.target.files[0]

    if (file) {
      const fileReader = new FileReader();

      fileReader.readAsText(file);
      fileReader.onloadend = () => {
        this.bulkContacts = parser(fileReader.result.trim());
        console.log(this.bulkContacts);
        this.setState({ stage: 2 });
      }
    }
  }

  handleAdd(e) {
    e.preventDefault();
    const newContact = { phone: this.state.phone, contactType: this.state.contactType };
    newContact.phone = newContact.phone.split('-').join('')

    if (!newContact.contactType) {
      newContact.contactType = "general"
    }

    if (newContact.phone.length < 10) {
      this.setState({ phone: newContact.phone, contactType: newContact.contactType });
    } else {
      this.bulkContacts.push(newContact);
      this.setState({ phone: "", contactType: "", stage: 2 });
    }
  }

  handleEdit(idx) {
    return e => { 
      e.preventDefault();
    }
  }

  handleDelete(idx) {
    return e => { 
      e.preventDefault();
      this.bulkContacts = this.bulkContacts.filter((contact, i) => i !== idx);
      this.forceUpdate();
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const bulkContactData = { contacts: JSON.stringify(this.bulkContacts) };

    this.props.createBulkContacts(bulkContactData)
      .then(() => this.props.closeModal());
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  render() {
    const { contactTypes } = this.props;

    const contactItems = this.bulkContacts ?
      this.bulkContacts.map((contact, i) => (
        <div key={i}>
          {contact.phone}
          {contact.contactType}
          <button>Edit</button>
          <button onClick={this.handleDelete(i)}>Delete</button>
        </div>
      )) : null;

    const contactTypeOptions = contactTypes.map((contactType, i) => {
			return (
				<option key={i} value={contactType.name}>
					{contactType.name}
				</option>
			);
		});

    let component;
    if (this.state.stage === 1) {
      component = 
      <div>
        <input type="file"
          accept=".csv"
          onChange={this.handleCSVFile} />
        <p>* Must have column header of "phone_number". Optionally can have a header "contactType", otherwise will be classified as "general" contact type.</p>
      </div>
    } else if (this.state.stage === 2) {
      component = 
        <div>
          {contactItems}
          <button onClick={this.handleSubmit}>Confirm</button>
          <button onClick={() => this.setState({ stage: 3 })}>+</button>
        </div>
    } else if (this.state.stage === 3) {
      component = 
        <div>
          <h1>Add Contact</h1>
          <input type="tel"
						name="phone"
						placeholder="Enter Phone Number (e.g. 123-456-7890)"
						value={this.state.phone}
						onChange={this.update("phone")}/>

					<select className="selectpicker" 
						defaultValue=""
						onChange={this.update("contactType")}>
							<option value="" disabled>Select a Contact Type</option>
							{contactTypeOptions}
					</select>

          <button onClick={this.handleAdd}>Submit</button>
        </div>
    }

    return (
      <div className="bulk-upload">
        <h1>Bulk Upload Contacts</h1>
        {component}
      </div>
    )
  }
};

export default BulkUpload;
