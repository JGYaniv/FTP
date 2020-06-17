import React from 'react';
import CreateContactCSS from './createcontact.css'

const CreateContact = () => {
    return (

        <div className="createcontact-container">
            <form>
                <h1>Add a Contact</h1>

                <label>Phone Number</label>
                <input type="tel" name="phone" placeholder="123-456-7890"/>

            
                <label>Contact Type</label>
                <select>
                    <option disabled defaultValue>Contact Type:</option>
                    <option value="general">General</option>
                    <option value="medic">Medic</option>
                </select>

                
                <button className='basic-btn' type="submit">ADD</button>
            </form>
        </div>
    )
}

export default CreateContact;
