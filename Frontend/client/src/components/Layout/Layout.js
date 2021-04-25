import Container from 'components/common/Container';
import DIMENSIONS from 'constants/dimensions';
import React from 'react';
import { Outlet } from 'react-router';
import Footer from './Footer';
import Header from './Header';
import { StyledImg, TextWrapper } from './styles';

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <StyledImg>
                <TextWrapper>Lorem ipsum dolor sit amet</TextWrapper>
            </StyledImg>
            <Container maxWidth={DIMENSIONS.PAGE_WIDTH + 'px'}>
                <Footer />
            </Container>
        </>
    );
};

export default Layout;
