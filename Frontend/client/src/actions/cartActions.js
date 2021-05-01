export const CART_ACTION_TYPES = {
    LOADING: 'LOADING',
    ADD_TO_CART_SUCCESS: 'ADD_TO_CART_SUCCESS',
    ADD_TO_CART_FAIL: 'ADD_TO_CART_FAIL',
};

export const addToCart = (item) => (dispatch) => {
    try {
        dispatch({
            type: CART_ACTION_TYPES.LOADING,
        });

        const retrievedData = localStorage.getItem('cart');
        const cart = retrievedData ? JSON.parse(retrievedData) : [];
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));

        dispatch({
            type: CART_ACTION_TYPES.ADD_TO_CART_SUCCESS,
            payload: cart,
        });
    } catch {
        dispatch({
            type: CART_ACTION_TYPES.ADD_TO_CART_FAIL,
        });
    }
};
