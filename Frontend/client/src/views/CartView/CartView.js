import image from 'assets/pngegg.png';
import Button from 'components/common/Button';
import Container from 'components/common/Container';
import DIMENSIONS from 'constants/dimensions';
import React from 'react';
import { Summary } from './components';
import CartItem from './components/CartItem';
import { StyledMain, SummaryContainer } from './styles';

const CartView = () => {
    return (
        <Container maxWidth={DIMENSIONS.PAGE_WIDTH + 'px'}>
            <SummaryContainer>
                <StyledMain>
                    <CartItem image={image}></CartItem>
                    <CartItem image={image}></CartItem>
                    <CartItem image={image}></CartItem>
                    <CartItem image={image}></CartItem>
                    <Button width="230px">Buy</Button>
                </StyledMain>
                <aside>
                    <Summary />
                </aside>
            </SummaryContainer>
        </Container>
    );
};

export default CartView;
