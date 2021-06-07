import AUTH_ACTION_TYPES from '../actions/authActionTypes';

const initialState = {
  loading: false,
  cart: [],
};

const loadStateFromLocalStorage = () => {
  try {
    const retrievedData = localStorage.getItem('token');
    const data = retrievedData ? JSON.parse(retrievedData) : undefined;

    if (data) {
      const userData = JSON.parse(atob(data.split('.')[1]));
      return {
        ...data,
        ...userData,
        loading: false,
        isLoggedIn: true,
      };
    }
  } catch {
    return initialState;
  }

  return initialState;
};

const authReducer = (state = loadStateFromLocalStorage(), action) => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.LOADING:
      return {
        ...state,
        loading: true,
        isLoggedIn: false,
      };
    case AUTH_ACTION_TYPES.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
      };
    case AUTH_ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...action.payload,
        loading: false,
        isLoggedIn: true,
      };
    case AUTH_ACTION_TYPES.REGISTER_FAIL:
    case AUTH_ACTION_TYPES.LOGIN_FAIL:
    case AUTH_ACTION_TYPES.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
