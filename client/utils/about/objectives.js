import baseAPI, { server } from '../keys';

const API = `${baseAPI}/api/v1/about/objectives`;

export const createObjectives = (data) => {
  return server.post(`${API}/create`, data);
};

export const updateObjectives = (data) => {
  return server.put(`${API}/${data.id}/update`, data.formData);
};

export const getObjectives = () => {
  return server.get(`${API}/list`);
};
