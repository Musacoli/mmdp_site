import baseAPI, { client } from '../keys';

const url = `${baseAPI}/api/v1`;
export const createResearch = {
  create: (data) => client.post(`${url}/resources/research`, data),
};
