import axios from 'axios';
import baseAPI from '..';

const API = `${baseAPI}/api/v1/about/governor-message`;

export const createGovernorMessage = (data) =>
  axios.post(`${API}/create`, data);

export const updateGovernorMessage = (data) =>
  axios.put(`${API}/${data.id}/update`, data.formData);

export const getGovernorMessage = () => axios.get(`${API}/list`);
