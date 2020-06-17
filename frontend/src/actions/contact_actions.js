import * as ContactAPIUtil from '../util/contact_api_util';

export const RECEIVE_ALL_CONTACTS = "RECEIVE_ALL_CONTACTS";
export const RECEIVE_CONTACT = "RECEIVE_CONTACT";
export const RECEIVE_CONTACT_ERRORS = "RECEIVE_CONTACT_ERRORS";

const receiveAllContacts = contacts => {
  return {
    type: RECEIVE_ALL_CONTACTS,
    contacts
  };
};

const receiveContact = contact => {
  return {
    type: RECEIVE_CONTACT,
    contact
  };
};

const receiveContactErrors = errors => {
  return {
    type: RECEIVE_CONTACT_ERRORS,
    errors
  };
};

export const fetchContacts = () => dispatch => {
  return ContactAPIUtil.fetchContacts()
    .then(contacts => dispatch(receiveAllContacts(contacts)));
};

export const createContact = contactData => dispatch => {
  return ContactAPIUtil.createContact(contactData)
    .then(contact => dispatch(receiveContact(contact)),
    err => dispatch(receiveContactErrors(err.response.data)));
};

export const createBulkContacts = contactDataArr => dispatch => {
  return ContactAPIUtil.createBulkContacts(contactDataArr)
    .then(contacts => contacts.forEach(contact => dispatch(receiveContact(contact))));
};
