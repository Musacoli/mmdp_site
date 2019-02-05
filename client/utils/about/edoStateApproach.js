import baseAPI, { client } from '../keys';

const API = `${baseAPI}/api/v1/about/edo-state-approach`;

export const createEdoStateApproach = data => client.post(`${API}/create`, data);

export const updateEdoStateApproach = data => client.put(`${API}/${data.id}/update`, data.formData);

export const getEdoStateApproach = () => client.get(`${API}/list`);
