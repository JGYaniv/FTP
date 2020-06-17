import axios from 'axios';

export const fetchUsers = () => {
  return axios.get('/api/users');
};

export const createUser = userData => {
  return axios.post('/api/users', userData);
};

export const updateUser = (userData, userId) => {
  return axios.patch(`/api/users/edit/${userId}`, userData);
};

export const deleteUser = userId => {
  return axios.delete(`/api/users/${userId}`);
};
