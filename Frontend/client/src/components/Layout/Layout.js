import backgroundImage from 'assets/home-background.jpg';
import Container from 'components/common/Container';
import Header from 'components/Header';
import DIMENSIONS from 'constants/dimensions';
import React from 'react';
import { HomeImage } from './styles';

const Layout = () => {
    return (
        <>
            <Header />
            <HomeImage src={backgroundImage} />
            <Container maxWidth={DIMENSIONS.PAGE_WIDTH + 'px'}>
                <main>
                    <Outlet />
                </main>
            </Container>
        </>
    );
};

export default Layout;
