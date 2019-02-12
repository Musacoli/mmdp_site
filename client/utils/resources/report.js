import baseAPI, { server } from '../keys';

const URL = `${baseAPI}/api/v1`;
const PAGE_LIMIT = 20;
export const createReport = (data) =>
  server.post(`${URL}/resources/reports`, data);
export const updateReport = (id, data) =>
  server.put(`${URL}/resources/reports/${id}`, data);

export const deleteReport = (id) =>
  server.delete(`${URL}/resources/reports/${id}`);

export const archiveReport = (id, archiveAction) =>
  server.patch(`${URL}/resources/reports/${id}/${archiveAction}`);

export const fetchReport = (id) => server.get(`${URL}/resources/reports/${id}`);

export const fetchReports = (page = 1) =>
  server.get(`${URL}/resources/reports/all?page=${page}&limit=${PAGE_LIMIT}`);
