import AuthLayout from 'layouts/AuthLayout';
import MainLayout from 'layouts/MainLayout';
import React from 'react';
import { Navigate } from 'react-router-dom';
import FirstView from 'views/FirstView';
import LoginView from 'views/LoginView';
import RegisterView from 'views/RegisterView';
import SecondView from 'views/SecondView';

const routes = (isLoggedIn) => [
    {
        path: '/',
        element: isLoggedIn ? <MainLayout /> : <Navigate to="/auth/login" />,
        children: [
            { path: 'first', element: <FirstView /> },
            { path: 'second', element: <SecondView /> },
        ],
    },
    {
        path: 'auth',
        element: !isLoggedIn ? <AuthLayout /> : <Navigate to="/first" />,
        children: [
            { path: 'login', element: <LoginView /> },
            { path: 'register', element: <RegisterView /> },
        ],
    },
];

export default routes;
