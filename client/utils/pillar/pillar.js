import baseAPI, { server } from '../keys';

const API = `${baseAPI}/api/v1/pillars`;

export const createPillar = (data) => {
  return server.post(`${API}`, data);
};

export const updatePillar = (data) => {
  return server.put(`${API}/${data.id}/update`, data.formData);
};

export const getPillar = (data) => {
  return server.get(`${API}/pillar-number/${data.pillarNumber}`);
};
