import axios from 'axios';
import baseAPI from './keys';

const url = `${baseAPI}/api/v1/auth/login`;

const apiRequest = (data) =>
  axios
    .post(url, data)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        return error.response.data;
      }
    });

export default apiRequest;
