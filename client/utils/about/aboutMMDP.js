import baseAPI, { server } from '../keys';

const API = `${baseAPI}/api/v1/about/about-mmdp`;

export const createAboutMMDP = (data) => {
  return server.post(`${API}/create`, data);
};

export const updateAboutMMDP = (data) => {
  return server.put(`${API}/${data.id}/update`, data.formData);
};

export const getAboutMMDP = () => {
  return server.get(`${API}/list`);
};
