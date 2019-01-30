import baseAPI, { client } from '../keys';

const API = `${baseAPI}/api/v1/about/governor-message`;

export const createGovernorMessage = (data) => {
  return client.post(`${API}/create`, data);
};

export const updateGovernorMessage = (data) => {
  return client.put(`${API}/${data.id}/update`, data.formData);
};

export const getGovernorMessage = () => {
  return client.get(`${API}/list`);
};
