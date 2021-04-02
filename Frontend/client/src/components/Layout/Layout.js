import Header from 'components/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <footer>footer</footer>
        </>
    );
};

export default Layout;
