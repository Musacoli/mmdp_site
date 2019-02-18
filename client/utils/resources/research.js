import baseAPI, { server } from '../keys';

const url = `${baseAPI}/api/v1`;
export const createResearch = {
  create: (data) => server.post(`${url}/resources/research`, data),
};
