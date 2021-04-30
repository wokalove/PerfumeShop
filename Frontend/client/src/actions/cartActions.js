export const CART_ACTION_TYPES = {
    LOADING: 'LOADING',
    ADD_TO_CART: 'ADD_TO_CART',
};

export const addToCart = (item) => (dispatch) => {
    dispatch({
        type: CART_ACTION_TYPES.LOADING,
    });

    const cart = JSON.parse(localStorage.getItem('cart'));
    cart.push(item);
    localStorage.setItem('cart', cart);

    dispatch({
        type: CART_ACTION_TYPES.ADD_TO_CART,
        payload: item,
    });
};

// TODO: auth actions url's

// export const register = (item) => async (dispatch) => {
//         dispatch({
//             type: CART_ACTION_TYPES.LOADING,
//         });

//         await axios.post('', {
//             username,
//             email,
//             password,
//         });

//         dispatch({
//             type: AUTH_ACTION_TYPES.REGISTER_SUCCESS,
//         });
// };

// export const login = (email, password) => async (dispatch) => {
//     try {
//         dispatch({
//             type: AUTH_ACTION_TYPES.LOADING,
//         });

//         const res = await axios
//             .post('', { email, password })
//             .then((response) => {
//                 if (response.data.token) {
//                     const userData = {
//                         token: response.data.token,
//                     };

//                     // TODO: local storage data name
//                     localStorage.setItem('token', JSON.stringify(userData));
//                 }

//                 return response.data;
//             });

//         dispatch({
//             type: AUTH_ACTION_TYPES.LOGIN_SUCCESS,
//             payload: {
//                 userId: 1, // TODO; user data
//                 username: 'username',
//                 email: 'email',
//                 token: res.token,
//             },
//         });
//     } catch (e) {
//         dispatch({
//             type: AUTH_ACTION_TYPES.LOGIN_FAIL,
//         });
//     }
// };

// export const logout = () => (dispatch) => {
//     dispatch({
//         type: AUTH_ACTION_TYPES.LOADING,
//     });

//     // TODO: local storage data name
//     localStorage.removeItem('token');

//     dispatch({
//         type: AUTH_ACTION_TYPES.LOGOUT,
//     });
// };
