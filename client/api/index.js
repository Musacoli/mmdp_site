let API = ""

if (process.env.NODE_ENV !== 'production') {
  API = 'http://web-app:3000/';
}

export default API;
