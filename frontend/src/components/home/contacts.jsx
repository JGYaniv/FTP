import React from 'react';
import ContactsCSS from './contacts.css'

const Contacts = () => {
    return (
        <div className="contacts-container">
            <h1>Contacts</h1>
            <h2>X</h2>
            <h3>TOTAL CONTACTS</h3>
            <button>CREATE</button>
            <button>MANAGE TYPES</button>
            <button>BULK UPLOAD</button>
        </div>
    )
}

export default Contacts;
