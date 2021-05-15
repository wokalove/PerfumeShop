import Button from 'components/common/Button';
import Container from 'components/common/Container';
import DIMENSIONS from 'constants/dimensions';
import React from 'react';
import { useSelector } from 'react-redux';
import { Summary } from './components';
import CartItem from './components/CartItem';
import { StyledMain, SummaryContainer } from './styles';

const CartView = () => {
    const cartState = useSelector((state) => state.cart);

    return (
        <Container maxWidth={DIMENSIONS.PAGE_WIDTH + 'px'}>
            <SummaryContainer>
                <StyledMain>
                    {cartState.cart.map((item, index) => (
                        <CartItem
                            itemName={item.name}
                            price={item.price}
                            quantity={item.quantity}
                            image={item.imageSrc}
                        ></CartItem>
                    ))}
                    {cartState.cart.length > 0 && (
                        <Button width="230px">Buy</Button>
                    )}
                </StyledMain>
                <aside>
                    <Summary />
                </aside>
            </SummaryContainer>
        </Container>
    );
};

export default CartView;
