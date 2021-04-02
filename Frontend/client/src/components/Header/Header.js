import { Container } from '@material-ui/core';
import React from 'react';
import {
    MainHeader,
    MainHeaderContainer,
    StyledNav,
    TopHeader,
    TopHeaderContent,
} from './styles';

const Header = () => {
    return (
        <header>
            <TopHeader>
                <Container maxWidth="md">
                    <TopHeaderContent>
                        <ul>
                            <li>Log in</li>
                            <li>Create an account</li>
                        </ul>
                    </TopHeaderContent>
                </Container>
            </TopHeader>
            <MainHeaderContainer>
                <Container maxWidth="md">
                    <MainHeader>
                        <h1>Logo</h1>
                        <StyledNav>
                            <ul>
                                <li>Home</li>
                                <li>Shop</li>
                                <li>Contact</li>
                                <li>Cart</li>
                            </ul>
                        </StyledNav>
                    </MainHeader>
                </Container>
            </MainHeaderContainer>
        </header>
    );
};

export default Header;
