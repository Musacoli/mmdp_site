import baseAPI, { client } from '../keys';

const API = `${baseAPI}/api/v1/about/objectives`;

export const createObjectives = data => client.post(`${API}/create`, data);

export const updateObjectives = data => client.put(`${API}/${data.id}/update`, data.formData);

export const getObjectives = () => client.get(`${API}/list`);
