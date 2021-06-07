export const CART_ACTION_TYPES = {
  LOADING: 'LOADING_CART',
  ADD_TO_CART_SUCCESS: 'ADD_TO_CART_SUCCESS',
  ADD_TO_CART_FAIL: 'ADD_TO_CART_FAIL',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
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

export const removeFromCart = () => (dispatch) => {
  localStorage.removeItem('cart');

  dispatch({
    type: CART_ACTION_TYPES.REMOVE_FROM_CART,
  });
};
