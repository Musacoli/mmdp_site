import axios from 'axios';
import baseAPI from './keys';

const url = `${baseAPI}/api/v1/users/confirmation`;

const apiRequest = {
  put: (data) =>
    axios
      .put(url, data)
      .then((response) => response.data)
      .catch((error) => {
        if (error.response) {
          return error.response.data;
        }
      }),
};

export default apiRequest;
