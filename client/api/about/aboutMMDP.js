import axios from 'axios';
import baseAPI from '..';

const API = `${baseAPI}/api/v1/about/about-mmdp`;

export const createAboutMMDP = (data) => axios.post(`${API}/create`, data);

export const updateAboutMMDP = (data) =>
  axios.put(`${API}/${data.id}/update`, data.formData);

export const getAboutMMDP = () => axios.get(`${API}/list`);
