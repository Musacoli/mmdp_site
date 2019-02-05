import axios from 'axios';
import baseURL from '..';

const url = `${baseURL}/api/v1`;
// eslint-disable-next-line import/prefer-default-export
export const createReport = data => axios.post(`${url}/resources/report`, data);
