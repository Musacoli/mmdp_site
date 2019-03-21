import { server } from './keys';
import { formatObjectToParams } from './helpers';

const apiVersion = 'api/v1/';
const documentsApiPrefix = `${apiVersion}resources/repository/document`;
const mediaApiPrefix = `${apiVersion}resources/repository/media`;
const stateApiPrefix = `${apiVersion}state`;
const regStatusApiPrefix = `${apiVersion}registration-status`;
const countryApiPrefix = `${apiVersion}country`;

export const api = {
  group: {
    create: (data) => server.post('api/groups/', data),
    list: (payload) => {
      if (payload) {
        const { page, search } = payload;
        return server.get(
          `api/groups?${formatObjectToParams({ page, name: search })}`,
        );
      }
      return server.get('api/groups');
    },
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
      list: ({ page, search }) =>
        server.get(
          `${documentsApiPrefix}?${formatObjectToParams({
            page,
            title: search,
          })}`,
        ),
      archive: (id) =>
        server.patch(`api/v1/resources/repository/document/${id}/archive`),
      delete: (id) =>
        server.delete(`api/v1/resources/repository/document/${id}`),
    },
    media: {
      create: (data) => server.post(mediaApiPrefix, data),
      update: (data, id) => server.put(`${mediaApiPrefix}/${id.id}`, data),
      retrieve: (id) => server.get(`${mediaApiPrefix}/${id}/`),
      list: () => server.get(mediaApiPrefix),
      delete: (id) => server.delete(`${mediaApiPrefix}/${id}`),
    },
  },
  dropdowns: {
    state: {
      create: (data) => server.post(stateApiPrefix, data),
      list: (data) => server.get(stateApiPrefix, data),
      update: (data) => server.put(`${stateApiPrefix}`, data),
      delete: (id) => server.delete(`${stateApiPrefix}/${id}`),
    },
    regStatus: {
      create: (data) => server.post(regStatusApiPrefix, data),
      list: (data) => server.get(regStatusApiPrefix, data),
      update: (data) => server.put(`${regStatusApiPrefix}`, data),
      delete: (id) => server.delete(`${regStatusApiPrefix}/${id}`),
    },

    country: {
      list: () => server.get(`${countryApiPrefix}`),
    },
  },
};
