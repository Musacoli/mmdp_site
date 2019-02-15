import baseAPI, { client } from '../keys';

const API = `${baseAPI}/api/v1/pillars`;

export const createPillar = (data) => {
  return client.post(`${API}`, data);
};

export const updatePillar = (data) => {
  return client.put(`${API}/${data.id}/update`, data.formData);
};

export const getPillar = (data) => {
  return client.get(`${API}/pillar-number/${data.pillarNumber}`);
};
