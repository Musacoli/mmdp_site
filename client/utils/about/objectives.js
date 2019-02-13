import baseAPI, { client } from '../keys';

const API = `${baseAPI}/api/v1/about/objectives`;

export const createObjectives = (data) => {
  return client.post(`${API}/create`, data);
};

export const updateObjectives = (data) => {
  return client.put(`${API}/${data.id}/update`, data.formData);
};

export const getObjectives = () => {
  return client.get(`${API}/list`);
};
