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
    create: data => client.post('groups/', data),
    list: () => client.get('api/groups/'),
    edit: (id, data) => client.put(`groups/${id}/`, data),
    delete: id => client.delete(`groups/${id}/`),
  },
  permission: {
    list: () => client.get('api/permissions'),
  },
  users: {
    create: data => client.post('api/v1/users', data),
    edit: data => client.put('api/v1/users/', data),
  }
};
