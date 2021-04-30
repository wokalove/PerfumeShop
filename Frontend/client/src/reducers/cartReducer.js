import { CART_ACTION_TYPES } from 'actions/cartActions';

const initialState = {
    loading: false,
    cart: [],
};

const loadStateFromLocalStorage = () => {
    try {
        const retrievedData = localStorage.getItem('token');
        const data = retrievedData ? JSON.parse(retrievedData) : undefined;

        if (data) {
            return {
                ...data,
                loading: false,
            };
        }
    } catch {
        // TODO: exception
        return initialState;
    }

    return initialState;
};

const cartReducer = (state = loadStateFromLocalStorage(), action) => {
    switch (action.type) {
        case CART_ACTION_TYPES.LOADING:
            return {
                ...state,
                loading: true,
            };
        case CART_ACTION_TYPES.ADD_TO_CART_SUCCESS:
            return {
                ...state,
                loading: false,
                cart: action.payload,
            };
        case CART_ACTION_TYPES.ADD_TO_CART_FAIL:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

export default cartReducer;
