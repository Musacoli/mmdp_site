import axios from 'axios';

export const authUserHeader = () => ({
  Authorization: 'Bearer {token}',
});

export const client = axios.create({
  baseURL: process.env.SERVER_APP_API_URL,
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