import baseAPI, { server } from '../keys';

const API = `${baseAPI}/api/v1/about/governor-message`;

export const createGovernorMessage = (data) => {
  return server.post(`${API}/create`, data);
};

export const updateGovernorMessage = (data) => {
  return server.put(`${API}/${data.id}/update`, data.formData);
};

export const getGovernorMessage = () => {
  return server.get(`${API}/list`);
};
