import Layout from 'components/Layout';
import React from 'react';
import LoginView from 'views/LoginView';
import RegisterView from 'views/RegisterView';

const routes = (isLoggedIn) => [
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: 'login', element: <LoginView /> },
            { path: 'second', element: <RegisterView /> },
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
