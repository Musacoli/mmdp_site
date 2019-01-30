import baseAPI, { client } from '../keys';

const url = `${baseAPI}/api/v1`;
// eslint-disable-next-line import/prefer-default-export
export const createReport = (data) =>
  client.post(`${url}/resources/report`, data);
