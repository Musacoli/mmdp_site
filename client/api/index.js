const API =
  process.env.NODE_ENV === 'development'
    ? process.env.DEV_SERVER_API_URL
    : process.env.SERVER_APP_API_URL;

export default API;
