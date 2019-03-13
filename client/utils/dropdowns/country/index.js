import baseAPI, { server } from '../../keys';
import { formatObjectToParams } from '../../helpers';

const url = `${baseAPI}/api/v1`;
export const country = {
  create: (data) => server.post(`${url}/dropdowns-country`, data),
  get: (id) => server.get(`${url}/dropdowns-country/${id}`),
  update: (data) => server.put(`${url}/dropdowns-country/`, data),
  getAll: (page = 1) =>
    server.get(
      `${url}/dropdowns-country?${formatObjectToParams({
        page,
      })}`,
    ),
  delete: (id) => server.delete(`${url}/dropdowns-country/${id}`),
};
