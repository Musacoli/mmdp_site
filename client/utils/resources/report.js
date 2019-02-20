import baseAPI, { server } from '../keys';
import { formatObjectToParams } from '../helpers';

const URL = `${baseAPI}/api/v1`;
export const createReport = (data) =>
  server.post(`${URL}/resources/reports`, data);
export const updateReport = (id, data) =>
  server.put(`${URL}/resources/reports/${id}`, data);

export const deleteReport = (id) =>
  server.delete(`${URL}/resources/reports/${id}`);

export const archiveReport = (id, archiveAction) =>
  server.patch(`${URL}/resources/reports/${id}/${archiveAction}`);

export const fetchReport = (id) => server.get(`${URL}/resources/reports/${id}`);

export const fetchReports = ({ page, search }) =>
  server.get(
    `${URL}/resources/reports?${formatObjectToParams({ page, title: search })}`,
  );
