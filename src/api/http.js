import axios from 'axios';
import {store} from './store';

const http = axios.create ({
  // baseURL: process.env.VUE_APP_ROOT_API,
  baseURL: 'http://localhost:8080/rest/v1',
  timeout: 1000,
  headers: {'Content-Type': 'application/json'},
});

http.interceptors.request.use(
  function (config) {
    const token = store.getToken();
    if (token) {
      config.headers.Authorization =  token;
    }
    return config;
  },
  function (error) {
    return Promise.reject (error);
  }
);

export default http;
