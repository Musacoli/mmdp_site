import baseAPI, { server } from '../keys';

const API = `${baseAPI}/api/v1/about/edo-state-approach`;

export const createEdoStateApproach = (data) => {
  return server.post(`${API}/create`, data);
};

export const updateEdoStateApproach = (data) => {
  return server.put(`${API}/${data.id}/update`, data.formData);
};

export const getEdoStateApproach = () => {
  return server.get(`${API}/list`);
};
