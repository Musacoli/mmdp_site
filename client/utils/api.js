import { client } from './keys';

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
    getOne: (username) => client.get(`api/v1/users/${username}`),
    delete: (data) => client.delete(`api/v1/users/${data}`),
  },
};
