import axios from 'axios';
import { BASE_URL } from 'constants/urls';

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const auth = token ? `Bearer ${token}` : '';
    config.headers.common.Authorization = auth;
    return config;
  },
  (error) => Promise.reject(error)
);

// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401 || error.response.status === 403) {
//       store.dispatch(logout());
//     }
//     return error;
//   }
// );

export default instance;
