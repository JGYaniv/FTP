import React from 'react';
import OrganizersCSS from './organizers.css'

const Organizers = () => {
    return (
        <div className="organizers-container">
            <table className="organizers-table">
                <tr>
                    <th>Username</th>
                    <th>Admin Status</th>
                    <th>Authenticated</th>
                    <th>Edit/Delete</th>
                </tr>              
                <tr>
                    <td>alexlee</td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>icons</td>
                </tr>
                <tr>
                    <td>therealalexlee</td>
                    <td>Yes</td>
                    <td>Yes</td>
                    <td>icons</td>
                </tr>      
            </table>

            <button className="basic-btn">ADD USER</button>
        </div>
    )
    
}

export default Organizers;
