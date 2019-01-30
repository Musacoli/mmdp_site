import baseAPI, { client } from '../keys';

const API = `${baseAPI}/api/v1/about/coordination`;

export const createCoordination = (data) => {
  return client.post(`${API}/create`, data);
};

export const updateCoordination = (data) => {
  return client.put(`${API}/${data.id}/update`, data.data);
};

export const getCoordination = () => {
  return client.get(`${API}/list`);
};
