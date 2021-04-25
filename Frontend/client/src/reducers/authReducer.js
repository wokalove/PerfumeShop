import { AUTH_ACTION_TYPES } from 'actions/authActions';

const initialState = {
    loading: false,
    isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
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
        case AUTH_ACTION_TYPES.REGISTER_FAIL:
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
        case AUTH_ACTION_TYPES.LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isLoggedIn: false,
            };
        case AUTH_ACTION_TYPES.LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export default authReducer;
