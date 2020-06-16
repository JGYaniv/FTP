import React from 'react';
import ContactsCSS from './contacts.css'

const Contacts = ({openModal}) => {
    return (
        <div className="contacts-container">
            <h1>54321</h1>
            <h2>TOTAL CONTACTS</h2>
            <button className="basic-btn" onClick={() => openModal('createContact')}>CREATE</button>
            <button className="basic-btn">MANAGE TYPES</button>
            <button className="basic-btn">BULK UPLOAD</button>
        </div>
    )
}

export default Contacts;
