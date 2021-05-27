import axios from 'axios';
import { logout } from './actions/authActions';
import store from './store';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    Authorization: `Bearer ${store.getState().auth.token}`,
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      store.dispatch(logout());
    }
    return error;
  }
);

export default instance;
