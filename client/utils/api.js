import { server } from './keys';

const apiVersion = 'api/v1/';
const documentsApiPrefix = `${apiVersion}resources/repository/document`;

export const api = {
  group: {
    create: (data) => server.post('api/groups/', data),
    list: () => server.get('api/groups/'),
    edit: (id, data) => server.put(`api/groups/${id}/`, data),
    delete: (id) => server.delete(`api/groups/${id}/`),
    retrieve: (id) => server.get(`api/groups/${id}/`),
  },
  permission: {
    list: () => server.get('api/permissions'),
  },
  users: {
    create: (data) => server.post('api/v1/users', data),
    edit: (data) => server.put('api/v1/users/', data),
    list: () => server.get('api/v1/users'),
    getOne: (username) => server.get(`api/v1/users/${username}`),
    delete: (data) => server.delete(`api/v1/users/${data}`),
  },
  resources: {
    document: {
      create: (data) => server.post(documentsApiPrefix, data),
      update: (data, id) => server.put(`${documentsApiPrefix}/${id.id}`, data),
      retrieve: (id) => server.get(`${documentsApiPrefix}/${id}/`),
    },
  },
  resources: {
    documents: {
      list: () => client.get('api/v1/resources/repository/documents'),
    },
  },
};
