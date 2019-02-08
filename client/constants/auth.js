export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS_OR_FAILURE = 'LOGIN_SUCCESS_OR_FAILURE';
export const baseAPI =
  process.env.NODE_ENV === 'development'
    ? process.env.DEV_SERVER_API_URL
    : process.env.SERVER_APP_API_URL;
