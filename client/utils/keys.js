import axios from 'axios';

export const authUserHeader = () => ({
  Authorization: `Bearer ${localStorage.userToken}`,
});

const serverUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.SERVER_APP_API_URL;
  }
  if (process.env.NODE_ENV === 'development') {
    return process.env.DEV_SERVER_API_URL;
  }
};

export const client = axios.create({
  baseURL: serverUrl(),
  headers: {
    'Content-Type': 'application/json',
    ...authUserHeader(),
  },
});

export default serverUrl();
