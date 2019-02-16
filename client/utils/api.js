import { client } from './keys';

const apiVersion = 'api/v1/';
const documentsApiPrefix = `${apiVersion}resources/repository/document`;

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
  resources: {
    document: {
      create: (data) => client.post(documentsApiPrefix, data),
      update: (data, id) => client.put(`${documentsApiPrefix}/${id.id}`, data),
      retrieve: (id) => client.get(`${documentsApiPrefix}/${id}/`),
    },
  },
};
