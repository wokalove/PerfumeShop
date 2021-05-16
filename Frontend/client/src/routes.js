import Layout from 'components/Layout';
import React from 'react';
import CartView from 'views/CartView';
import HomeView from 'views/HomeView';
import LoginView from 'views/LoginView';
import RegisterView from 'views/RegisterView';
import ShopView from 'views/ShopView';

const routes = (isLoggedIn) => [
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <HomeView /> },
            { path: 'home', element: <HomeView /> },
            { path: 'shop', element: <ShopView /> },
            { path: 'contact' },
            { path: 'cart', element: <CartView /> },
            { path: 'login', element: <LoginView /> },
            { path: 'register', element: <RegisterView /> },
        ],
    },
];

export default routes;
