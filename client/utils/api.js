import axios from 'axios';

export const authUserHeader = () => {
  const token = localStorage.getItem('userToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const serverUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    const { SERVER_APP_API_URL } = process.env;
    return SERVER_APP_API_URL;
  }
  if (process.env.NODE_ENV === 'development') {
    const { DEV_SERVER_API_URL: SERVER_APP_API_URL } = process.env;
    return SERVER_APP_API_URL;
  }
};

export const client = axios.create({
  baseURL: serverUrl(),
  headers: {
    'Content-Type': 'application/json',
    ...authUserHeader(),
  },
});

export const api = {
  group: {
    create: (data) => client.post('api/groups/', data),
    list: () => client.get('api/groups/'),
    edit: (id, data) => client.put(`api/groups/${id}/`, data),
    delete: (id) => client.delete(`api/groups/${id}/`),
    retrieve: (id) => client.get(`api/groups/${id}/`),
  },
  permission: {
    list: () => client.get('api/permissions'),
  },
  users: {
    create: (data) => client.post('api/v1/users', data),
    edit: (data) => client.put('api/v1/users/', data),
    list: () => client.get('api/v1/users'),
    delete: (data) => client.delete(`api/v1/users/${data}`),
  },
};
