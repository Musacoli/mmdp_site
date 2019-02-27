import { server } from '../keys';

export const api = {
  create: (data) => server.post('/api/v1/dropdowns/LGA', data),
  list: () => server.get(`/api/v1/dropdowns/LGA`),
  get: (stateId) => server.get(`/api/v1/dropdowns/LGA/${stateId}`),
  edit: (data) => server.put(`/api/v1/dropdowns/LGA`, data),
  delete: (id) => server.delete(`/api/v1/dropdowns/LGA/${id}`),
};
