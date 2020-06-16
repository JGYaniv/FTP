import axios from 'axios';

export const fetchContactTypes = () => {
  return axios.get('/api/contact_types');
};

export const createContactType = typeData => {
  return axios.post('/api/contact_types', typeData);
};

export const updateContactType = (typeData, typeId) => {
  return axios.patch(`/api/contact_types/edit/${typeId}`, typeData);
};

export const deleteContactType = typeId => {
  return axios.delete(`/api/contact_types/${typeId}`);
};
