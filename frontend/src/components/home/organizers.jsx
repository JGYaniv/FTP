import React from 'react';
import OrganizersCSS from './organizers.css'

class Organizers extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        const userList = this.props.users.map((user, i) => (
            <tr key={i}>
                <td>{user.email}</td>
                <td>{user.admin ? 'yes' : 'no'}</td>
                <td>work in progress</td>
                <td>
                    <i onClick={()=> this.props.openModal('editUser', user._id)} className="fas fa-edit"></i>
                    <i onClick={()=> this.props.openModal('deleteUser', user._id)} className="fas fa-trash-alt"></i>
                </td>
            </tr>
        ));
        return (
            <div className="organizers-container">
                <table className="organizers-table">
                    <tbody>
                    <tr>
                        <th>Email</th>
                        <th>Admin Status</th>
                        <th>Authenticated</th>
                        <th><button className="basic-btn add-btn" onClick={() => this.props.openModal('addUser')}>ADD USER</button></th>
                    </tr>              

                    {userList}
                    </tbody>
                </table>

                
            </div>
        )
    }
}

export default Organizers;

        