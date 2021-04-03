import Layout from 'components/Layout';
import React from 'react';
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
            { path: 'login', element: <LoginView /> },
            { path: 'register', element: <RegisterView /> },
        ],
    },
    // {
    //     path: 'auth',
    //     element: !isLoggedIn ? <AuthLayout /> : <Navigate to="/first" />,
    //     children: [
    //         { path: 'login', element: <LoginView /> },
    //         { path: 'register', element: <RegisterView /> },
    //     ],
    // },
];

export default routes;
