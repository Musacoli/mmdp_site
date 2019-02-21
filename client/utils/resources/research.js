import baseAPI, { server } from '../keys';

const url = `${baseAPI}/api/v1`;
export const createResearch = {
  create: (data) => server.post(`${url}/resources/research`, data),
  get: (id) => server.get(`${url}/resources/research/${id}`),
  update: (data, id) => server.put(`${url}/resources/research/${id}`, data),
  getall: (num) => server.get(`${url}/resources/research?page=${num}`),
};
