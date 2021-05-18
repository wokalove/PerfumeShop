import { Badge } from '@material-ui/core';
import { logout } from 'actions/authActions';
import Container from 'components/common/Container';
import Logo from 'components/Logo';
import DIMENSIONS from 'constants/dimensions';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const cartState = useSelector((state) => state.cart);

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <>
      <TopHeader>
        <Container maxWidth={DIMENSIONS.PAGE_WIDTH + 'px'}>
          <TopHeaderContent>
            <ul>
              {authState.isLoggedIn ? (
                <>
                  <li>
                    <StyledNavLink to="#" color="white">
                      Account
                    </StyledNavLink>
                  </li>
                  <li>
                    <StyledNavLink to="#" color="white">
                      History
                    </StyledNavLink>
                  </li>
                  <li>
                    <StyledNavLink color="white" to="/" onClick={handleLogout}>
                      Log out
                    </StyledNavLink>
                  </li>
                </>
              ) : (
                topBarLinksNotAuth.map((item, index) => (
                  <li>
                    <StyledNavLink key={index} to={item.to} color="white">
                      {item.text}
                    </StyledNavLink>
                  </li>
                ))
              )}
            </ul>
          </TopHeaderContent>
        </Container>
      </TopHeader>
      <MainHeaderContainer>
        <Container maxWidth={DIMENSIONS.PAGE_WIDTH + 'px'}>
          <MainHeader>
            <Logo />
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
                    badgeContent={cartState?.cart?.length ?? 0}
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
