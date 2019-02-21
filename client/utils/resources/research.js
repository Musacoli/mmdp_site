import baseAPI, { server } from '../keys';
import { formatObjectToParams } from '../helpers';

const url = `${baseAPI}/api/v1`;
export const research = {
  create: (data) => server.post(`${url}/resources/research`, data),
  get: (id) => server.get(`${url}/resources/research/${id}`),
  update: (data, id) => server.put(`${url}/resources/research/${id}`, data),
  getAll: ({ page = 1, query = '' }) =>
    server.get(
      `${url}/resources/research?${formatObjectToParams({
        page,
        title: query,
      })}`,
    ),
  delete: (id) => server.delete(`${url}/resources/research/${id}`),
};
