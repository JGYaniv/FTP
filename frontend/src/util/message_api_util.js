import axios from 'axios';

export const fetchMessages = () => {
  return axios.get('/api/messages');
};

export const createMessage = (messageData) => {
  return axios.post('/api/messages', messageData);
};
