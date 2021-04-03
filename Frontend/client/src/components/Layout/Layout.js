import Container from 'components/common/Container';
import Footer from 'components/Footer';
import Header from 'components/Header';
import DIMENSIONS from 'constants/dimensions';
import React from 'react';
import { Outlet } from 'react-router';
import { StyledImg } from './styles';

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <StyledImg />
            <Container maxWidth={DIMENSIONS.PAGE_WIDTH + 'px'}>
                <Footer />
            </Container>
        </>
    );
};

export default Layout;
