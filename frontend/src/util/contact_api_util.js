import axios from 'axios';

export const fetchContacts = () => {
  return axios.get('/api/contacts');
};

export const createContact = contactData => {
  return axios.post('/api/contacts', contactData);
};
