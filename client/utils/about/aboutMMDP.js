import baseAPI, { client } from '../keys';

const API = `${baseAPI}/api/v1/about/about-mmdp`;

export const createAboutMMDP = (data) => {
  return client.post(`${API}/create`, data);
};

export const updateAboutMMDP = (data) => {
  return client.put(`${API}/${data.id}/update`, data.formData);
};

export const getAboutMMDP = () => {
  return client.get(`${API}/list`);
};
