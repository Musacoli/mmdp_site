import { server } from './keys';
import { formatObjectToParams } from './helpers';

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
    list: ({ page, search, selectedOption }) =>
      server.get(
        `api/v1/users?${formatObjectToParams({
          page,
          groups: selectedOption,
          username: search,
        })}`,
      ),
    getOne: (username) => server.get(`api/v1/users/${username}`),
    delete: (data) => server.delete(`api/v1/users/${data}`),
  },
  resources: {
    document: {
      create: (data) => server.post(documentsApiPrefix, data),
      update: (data, id) => server.put(`${documentsApiPrefix}/${id.id}`, data),
      retrieve: (id) => server.get(`${documentsApiPrefix}/${id}/`),
      list: () => server.get(documentsApiPrefix),
    },
  },
};
