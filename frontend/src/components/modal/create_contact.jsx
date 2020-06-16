import React from 'react';
import CreateContactCSS from './createcontact.css'

const CreateContact = () => {
    return (

        <div className="createcontact-container">
            <form>
                <h1>Add a Contact</h1>
                <input type="tel" name="phone" placeholder="123-456-7890"/>

            
                <select class="selectpicker">
                    <option>General</option>
                    <option>Medic</option>
                    <option>ALEXLEE</option>
                </select>

                
                <button className='btn btn-danger' type="submit">Add</button>
            </form>
        </div>
    )
}

export default CreateContact;
