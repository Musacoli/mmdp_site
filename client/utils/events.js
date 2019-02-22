import { server } from './keys';
import { formatObjectToParams } from './helpers';

export const api = {
  create: (data) => server.post('/api/v1/events', data),
  list: ({ page, search }) =>
    server.get(
      `/api/v1/events?${formatObjectToParams({ page, title: search })}`,
    ),
  retrieve: (id) => server.get(`/api/v1/events/${id}`),
  edit: (id, data) => server.put(`/api/v1/events/${id}`, data),
  delete: (id) => server.delete(`/api/v1/events/${id}`),
};
