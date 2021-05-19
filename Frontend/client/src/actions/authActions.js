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

export const register = (username, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: AUTH_ACTION_TYPES.LOADING,
        });

        await axios.post('api/register', {
            username,
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

        const res = await axios
            .post('api/login', { email, password })
            .then((response) => {
                if (response.data.token) {
                    const userData = {
                        token: response.data.token,
                    };

                    localStorage.setItem('token', JSON.stringify(userData));
                }

                return response.data;
            });

        dispatch({
            type: AUTH_ACTION_TYPES.LOGIN_SUCCESS,
            payload: {
                userId: 1, // TODO; user data
                username: 'username',
                email: 'email',
                token: res.token,
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
