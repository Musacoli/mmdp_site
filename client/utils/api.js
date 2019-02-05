import axios from 'axios';
import { baseAPI } from '../constants';

export const authUserHeader = () => {
  const token = localStorage.getItem('userToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const client = axios.create({
  baseURL: baseAPI,
  headers: {
    'Content-Type': 'application/json',
    ...authUserHeader(),
  },
});

export const api = {
  group: {
    create: data => client.post('api/groups/', data),
    list: () => client.get('api/groups/'),
    edit: (id, data) => client.put(`api/groups/${id}/`, data),
    delete: id => client.delete(`api/groups/${id}/`),
    retrieve: id => client.get(`api/groups/${id}/`),
  },
  permission: {
    list: () => client.get('api/permissions'),
  },
};
