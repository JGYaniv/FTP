import React from 'react';
import DeleteUserCSS from './deleteuser.css'

class DeleteUser extends React.Component {
    constructor(props) {
        super(props)
        
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleSubmit(e) {
        e.preventDefault();
        this.props.deleteUser(this.props.selectedUser._id);
    }

    render() {
        return (
            <div className="deleteuser-container">

                <h1>Confirm Delete</h1>

                <h2>Are you sure you want to delete <strong>{this.props.selectedUser.email}</strong></h2>

                <form onSubmit={this.handleSubmit}>
                    <div>
                        <button className='btn basic-btn' type="submit">DELETE</button>
                        <button onClick={()=>this.props.closeModal()}className='btn basic-btn'>CANCEL</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default DeleteUser;
