import Layout from 'components/Layout';
import React from 'react';
import { Navigate } from 'react-router';
import CartView from 'views/CartView';
import HomeView from 'views/HomeView';
import LoginView from 'views/LoginView';
import RegisterView from 'views/RegisterView';
import ShopView from 'views/ShopView';
import TransactionsView from 'views/TransactionsView';

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
      {
        path: 'history',
        element: isLoggedIn ? <TransactionsView /> : <Navigate to="login" />,
      },
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
    ],
  },
];

export default routes;
