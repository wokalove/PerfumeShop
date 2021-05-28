import axios from 'axiosConfig';

export const AUTH_ACTION_TYPES = {
  LOADING: 'LOADING',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAIL: 'REGISTER_FAIL',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
  LOGOUT: 'LOGOUT',
};

// TODO: auth actions url's

export const register =
  (name, surname, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: AUTH_ACTION_TYPES.LOADING,
      });

      await axios.post('register', {
        name,
        surname,
        email,
        password,
      });

      dispatch({
        type: AUTH_ACTION_TYPES.REGISTER_SUCCESS,
      });
    } catch (e) {
      dispatch({
        type: AUTH_ACTION_TYPES.REGISTER_FAIL,
      });
    }
  };

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: AUTH_ACTION_TYPES.LOADING,
    });

    const res = await axios.post('login_check', { username: email, password });
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
