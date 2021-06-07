import axios from 'axios';
// import { logout } from './actions/authActions';
import store from './store';

const instance = axios.create({
  baseURL: 'http://localhost:8000',
});

instance.interceptors.request.use(
  (config) => {
    const { token } = store.getState().auth;
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
