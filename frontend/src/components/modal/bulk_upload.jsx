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
      idx: null
    }

    this.handleCSVFile = this.handleCSVFile.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileClick = this.handleFileClick.bind(this);
  }

  handleCSVFile(e) {
    e.preventDefault();
    const file = e.target.files[0]

    if (file) {
      const fileReader = new FileReader();

      fileReader.readAsText(file);
      fileReader.onloadend = () => {
        this.bulkContacts = parser(fileReader.result.trim());
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

  handleEdit(e) {
    e.preventDefault();

    this.bulkContacts[this.state.idx].phone = this.state.phone;
    this.bulkContacts[this.state.idx].contactType = this.state.contactType;
    this.setState({ phone: "", contactType: "", stage: 2 });
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

  handleFileClick() {
    document.getElementById("file").click();
  }

  render() {
    const { contactTypes } = this.props;

    const contactItems = this.bulkContacts ?
      this.bulkContacts.map((contact, i) => (
        <div className="bulk-contact-list-item" key={i}>
          <div>{contact.phone.slice(0, 3) + '-' + contact.phone.slice(3, 6) + '-' + contact.phone.slice(6) + ' '} </div>
          <div>{contact.contactType}</div>
          <div>
            <i onClick={() => this.setState({ phone: this.bulkContacts[i].phone, contactType: this.bulkContacts[i].contactType, idx: i, stage: 4 })} className="fas fa-edit"></i>
            <i onClick={this.handleDelete(i)} className="fas fa-trash-alt"></i>
          </div>
        </div>
      )) : null;

    const currentContactType = this.state.contactType;

    const contactTypeOptions = contactTypes.map((contactType, i) => {
			return (
        <option key={i}
          value={contactType.name}
          {...currentContactType === contactType ? 'selected' : '' }>
					{contactType.name}
				</option>
			);
		});

    let component;
    if (this.state.stage === 1) {
      component = 
      <div>
        <button className="basic-btn file-btn" onClick={this.handleFileClick}>CHOOSE CSV FILE</button>
        <input id="file"
          type="file"
          accept=".csv"
          onChange={this.handleCSVFile} />
        <label>* Must have column header of "phone_number". Optionally can have a header "contactType", 
          otherwise will be classified as "general" contact type.</label>
      </div>
    } else if (this.state.stage === 2) {
      component = 
        <div>
          <div className="bulk-contact-list">
            {contactItems}
          </div>
          <div className="bulk-add-btns">
            <button className="basic-btn" onClick={() => this.setState({ stage: 3 })}>+</button>
            <button className="basic-btn" onClick={this.handleSubmit}>CONFIRM</button>
          </div>
        </div>
    } else if (this.state.stage === 3) {
      component = 
        <div className="-add">
          <h1>Add Contact</h1>
          <input type="tel"
						name="phone"
						placeholder="123-456-7890"
						value={this.state.phone}
						onChange={this.update("phone")}/>

					<select className="selectpicker" 
						value={this.state.contactType}
						onChange={this.update("contactType")}>
							<option value="" disabled>Select a Contact Type</option>
							{contactTypeOptions}
					</select>

          <button onClick={this.handleAdd}>Submit</button>
        </div>
    } else if (this.state.stage === 4) {
      component = 
        <div className="bulk-edit-contact">
          <h1>Edit Contact</h1>
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

          <button className="basic-btn" onClick={this.handleEdit}>SUBMIT</button>
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
