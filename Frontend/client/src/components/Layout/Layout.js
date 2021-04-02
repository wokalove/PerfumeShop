import Header from 'components/Header';
import React from 'react';
import { Outlet } from 'react-router';

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default Layout;
