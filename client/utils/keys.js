import axios from 'axios';
import toastr from 'toastr';
import { authUserHeader } from './auth';

const serverUrl = () => {
  let dbURl = null;
  if (process.env.NODE_ENV === 'production') {
    dbURl = process.env.SERVER_APP_API_URL;
  }
  if (process.env.NODE_ENV === 'development') {
    dbURl = process.env.DEV_SERVER_API_URL;
  }
  if (!dbURl) {
    dbURl = 'http://staging2.mmdp.ng:3000';
  }
  return dbURl;
};

const server = axios.create({
  baseURL: serverUrl(),
  headers: {
    'Content-Type': 'application/json',
    ...authUserHeader(),
  },
});

server.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let err;
    toastr.remove();
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // clear user token on local storage
          localStorage.removeItem('userToken');
          // prevent toaster from displaying if its used by any saga
          toastr.options.toastClass = 'hide-toast';
          // redirect to login page
          window.location.assign('/login');
          break;
        case 403:
          // deal with authorization errors
          break;
        default:
          break;
      }
    } else {
      // deal with network errors
      // set a sensible message to be toasted by the consumer
      err = {
        response: {
          data: { message: 'Please check your network and try again.' },
        },
      };
    }
    return Promise.reject(err || error);
  },
);

export { server };

export default serverUrl();
