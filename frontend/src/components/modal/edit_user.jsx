import React from 'react';
import AddUserCSS from './adduser.css'

class EditUser extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            phone: '',
            admin: ''
        }

        let phone = '';
        if (!!this.props.selectedUser.phone) {
            phone = this.props.selectedUser.phone;
            phone = phone.slice(0, 3) + '-' + phone.slice(3, 6) + '-' + phone.slice(6);
            this.state.phone = phone;
        }

        this.state.email = this.props.selectedUser.email;
        this.state.admin = this.props.selectedUser.admin;


        this.handleSubmit = this.handleSubmit.bind(this)
    }


    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    componentWillUnmount() {
        this.props.fetchUsers();
    }

    handleSubmit(e) {
        e.preventDefault();
        let admin = false;
        let phone = this.state.phone.split('-').join('')

        if (this.state.admin === 'true') {
            admin = true;
        }


        this.props.updateUser({ email: this.state.email, admin: admin, phone: phone }, this.props.selectedUser._id)
        .then(()=> {
            this.props.closeModal()})
    }

    render() {

        return (
            <div className="adduser-container">

                <h1>Edit an Organizer</h1>

                <form onSubmit={this.handleSubmit}>

                    <label>Email</label>
                    <input type="email" placeholder="alexlee@alexlee.com"
                        onChange={this.update("email")} value={this.state.email} />

                    <label>Phone Number</label>
                    <input type="tel" name="phone" placeholder="123-456-7890"
                        onChange={this.update("phone")} value={this.state.phone} />


                    <label>Admin</label>
                    <div className="radio-btns">
                        <div className="radio">
                            <label><input type="radio" name="optradio"
                                onChange={this.update("admin")}
                                value={true} checked={this.state.admin ? true : false} /> Yes</label>
                        </div>
                        <div className="radio">
                            <label><input type="radio" name="optradio"
                                onChange={this.update("admin")}
                                value={false} checked={!this.state.admin ? true : false} /> No</label>
                        </div>
                    </div>

                    <button className='btn basic-btn' type="submit">EDIT</button>
                </form>
            </div>
        )
    }
}

export default EditUser;
