import React from 'react';
import CreateContactCSS from './createcontact.css'

class CreateContact extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			phone: "",
			contactType: ""
		};

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	update(field) {
		return e => this.setState({ [field]: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		const contactData = this.state;
		contactData.phone = contactData.phone.split('-').join('')

		this.props.createContact(contactData).then(() => this.props.closeModal());
		this.setState({ phone: "", contactType: "" });
	}

	render() {
		const { contactTypes } = this.props;

		const contactTypeOptions = contactTypes.map((contactType, i) => {
			return (
				<option key={i} value={contactType.name}>
					{contactType.name}
				</option>
			);
		});

		return (
			<div className="createcontact-container">
				<form onSubmit={this.handleSubmit}>
					<h1>Add a Contact</h1>

					<label>Phone Number</label>
					<input type="tel"
						name="phone"
						placeholder="Enter Phone Number (e.g. 123-456-7890)"
						value={this.state.phone}
						onChange={this.update("phone")}/>

					<label>Contact Type</label>
					<select className="selectpicker" 
						defaultValue=""
						onChange={this.update("contactType")}>
							<option value="" disabled>Select a Contact Type</option>
							{contactTypeOptions}
					</select>
	
					<button className='basic-btn'
						type="submit"
						>
								Add
					</button>
				</form>
			</div>
		)
	}
}

export default CreateContact;
