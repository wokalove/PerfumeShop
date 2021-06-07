import axios from '../axiosConfig';
import AUTH_ACTION_TYPES from './authActionTypes';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: AUTH_ACTION_TYPES.LOADING,
    });

    const res = await axios.post('/api/login_check', { username: email, password });

    localStorage.setItem('token', res.data.token);
    const userData = JSON.parse(atob(res.data.token.split('.')[1]));

    dispatch({
      type: AUTH_ACTION_TYPES.LOGIN_SUCCESS,
      payload: {
        id: userData.id,
        name: userData.name,
        surname: userData.surname,
        email: userData.username,
        token: res.data.token,
      },
    });
  } catch (e) {
    dispatch({
      type: AUTH_ACTION_TYPES.LOGIN_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: AUTH_ACTION_TYPES.LOADING,
  });

  localStorage.removeItem('token');

  dispatch({
    type: AUTH_ACTION_TYPES.LOGOUT,
  });
};
