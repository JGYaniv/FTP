import React from 'react';
import ContactsCSS from './contacts.css'

const Contacts = ({openModal}) => {
    return (
        <div className="contacts-container">
            <div className="totalcontacts">
                <h2>TOTAL CONTACTS</h2>
                <h1>54321</h1>
            </div>

            <div className="contact-btns">
                <button className="basic-btn" onClick={() => openModal('createContact')}>ADD CONTACT</button>
                <button className="basic-btn" onClick={() => openModal('manageTypes')}>MANAGE TYPES</button>
                <button className="basic-btn">BULK UPLOAD</button>
            </div>
        </div>
    )
}

export default Contacts;
