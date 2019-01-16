
let API = "";

if(process.env.NODE_ENV !== 'production') {
  API = "http://localhost:3000";
}

export default API;
