import axios from 'axios';
const BASE_URL = 'http://localhost:5003/'

const instance = axios.create({
    baseURL: BASE_URL
});
  
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers:{'Content-Type':'application/json'}, 
    withCredentials:true    //adds cookie on requests
});
  
  // Alter defaults after instance has been created
//   instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  export default instance;