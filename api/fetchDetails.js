import axios from 'axios';
import addAuth from './addAuth';

const requestApi = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API,
});

addAuth(requestApi);
export default requestApi;
