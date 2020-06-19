import axios from 'axios';

export const fetchContactTypes = () => {
  return axios.get('/api/contact_types');
};

export const createContactType = typeData => {
  return axios.post('/api/contact_types', typeData);
};

export const updateContactType = (typeData, typeName) => {
  return axios.patch(`/api/contact_types/edit/${typeName}`, typeData);
};

export const deleteContactType = typeName => {
  return axios.delete(`/api/contact_types/delete/${typeName}`);
};

export const fetchContactTypeCount = typeName => {
  return axios.get(`/api/contact_types/count/${typeName}`);
};
