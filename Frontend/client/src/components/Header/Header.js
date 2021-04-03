import { Badge } from '@material-ui/core';
import Container from 'components/common/Container';
import DIMENSIONS from 'constants/dimensions';
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
        <>
            <TopHeader>
                <Container maxWidth={DIMENSIONS.PAGE_WIDTH + 'px'}>
                    <TopHeaderContent>
                        <ul>
                            <li>Log in</li>
                            <li>Create an account</li>
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
                                <li>Home</li>
                                <li>Shop</li>
                                <li>Contact</li>
                                <li>
                                    <Badge
                                        badgeContent={4}
                                        color="primary"
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                    >
                                        Cart
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
