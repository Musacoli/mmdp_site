import axios from 'axios';

const token = localStorage.getItem('userToken');

export const stakeholders = axios.create({
  baseURL: process.env.DEV_SERVER_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export const apiRequest = {
  create: (data) =>
    stakeholders.post('/api/v1/stakeholders-directory/create', data),
};
