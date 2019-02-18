import baseAPI, { server } from '../keys';

const API = `${baseAPI}/api/v1/about/coordination`;

export const createCoordination = (data) => {
  return server.post(`${API}/create`, data);
};

export const updateCoordination = (data) => {
  return server.put(`${API}/${data.id}/update`, data.data);
};

export const getCoordination = () => {
  return server.get(`${API}/list`);
};
