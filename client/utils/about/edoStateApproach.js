import baseAPI, { client } from '../keys';

const API = `${baseAPI}/api/v1/about/edo-state-approach`;

export const createEdoStateApproach = (data) => {
  return client.post(`${API}/create`, data);
};

export const updateEdoStateApproach = (data) => {
  return client.put(`${API}/${data.id}/update`, data.formData);
};

export const getEdoStateApproach = () => {
  return client.get(`${API}/list`);
};
