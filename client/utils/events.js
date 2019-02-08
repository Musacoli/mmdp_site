import axios from 'axios';

const token = localStorage.getItem('userToken');

export const events = axios.create({
  baseURL: process.env.DEV_SERVER_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
});

export const api = {
  create: (data) => events.post('/api/v1/events', data),
  list: (pageNumber) => events.get(`/api/v1/events?page=${pageNumber}`),
  retrieve: (id) => events.get(`/api/v1/events/${id}`),
  edit: (id, data) => events.put(`/api/v1/events/${id}`, data),
  delete: (id) => events.delete(`/api/v1/events/${id}`),
};
