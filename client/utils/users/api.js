import axios from 'axios';
import baseAPI from '../keys';

const token = localStorage.getItem('userToken');
const url = `${baseAPI}/api/v1/users/profile/${token}`;

const userApi = {
  get: () =>
    axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        if (error.response) {
          return error.response.data;
        }
      }),
};

export default userApi;
