import backgroundImage from 'assets/home-background.jpg';
import Header from 'components/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { HomeImage } from './styles';

const Layout = () => {
    return (
        <>
            <Header />
            <HomeImage src={backgroundImage} />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
