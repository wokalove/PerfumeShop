import { Badge } from '@material-ui/core';
import Container from 'components/common/Container';
import DIMENSIONS from 'constants/dimensions';
import React from 'react';
import { useSelector } from 'react-redux';
import {
    MainHeader,
    MainHeaderContainer,
    StyledNav,
    StyledNavLink,
    TopHeader,
    TopHeaderContent,
} from './styles';

const topBarLinksAuth = [
    {
        text: 'Account',
        to: '/#',
    },
    {
        text: 'History',
        to: '/#',
    },
    {
        text: 'Log out',
        to: '/#',
    },
];

const topBarLinksNotAuth = [
    {
        text: 'Log in',
        to: '/login',
    },
    {
        text: 'Create an account',
        to: '/register',
    },
];

const Header = () => {
    const authState = useSelector((state) => state.auth);

    return (
        <>
            <TopHeader>
                <Container maxWidth={DIMENSIONS.PAGE_WIDTH + 'px'}>
                    <TopHeaderContent>
                        <ul>
                            {authState.isLoggedIn
                                ? topBarLinksAuth.map((item, index) => (
                                      <li>
                                          <StyledNavLink
                                              key={index}
                                              to={item.to}
                                              color="white"
                                          >
                                              {item.text}
                                          </StyledNavLink>
                                      </li>
                                  ))
                                : topBarLinksNotAuth.map((item, index) => (
                                      <li>
                                          <StyledNavLink
                                              key={index}
                                              to={item.to}
                                              color="white"
                                          >
                                              {item.text}
                                          </StyledNavLink>
                                      </li>
                                  ))}
                        </ul>
                    </TopHeaderContent>
                </Container>
            </TopHeader>
            <MainHeaderContainer>
                <Container maxWidth={DIMENSIONS.PAGE_WIDTH + 'px'}>
                    <MainHeader>
                        <h1>Logo</h1>
                        <StyledNav>
                            <ul>
                                <li>
                                    <StyledNavLink to="/home" color="black">
                                        Home
                                    </StyledNavLink>
                                </li>
                                <li>
                                    <StyledNavLink to="/shop" color="black">
                                        Shop
                                    </StyledNavLink>
                                </li>
                                <li>
                                    <StyledNavLink to="/contact" color="black">
                                        Contact
                                    </StyledNavLink>
                                </li>
                                <li>
                                    <Badge
                                        badgeContent={4}
                                        color="primary"
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <StyledNavLink to="/cart" color="black">
                                            Cart
                                        </StyledNavLink>
                                    </Badge>
                                </li>
                            </ul>
                        </StyledNav>
                    </MainHeader>
                </Container>
            </MainHeaderContainer>
        </>
    );
};

export default Header;
