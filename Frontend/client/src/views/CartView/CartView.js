import axios from 'axiosConfig';
import Button from 'components/common/Button';
import Container from 'components/common/Container';
import DIMENSIONS from 'constants/dimensions';
import React from 'react';
import { useSelector } from 'react-redux';
import { Summary } from './components';
import CartItem from './components/CartItem';
import { StyledMain, SummaryContainer } from './styles';

const buy = async (cart) => {
  try {
    await axios.post(
      '/transactions',
      cart.map((item) => {
        return {
          product_id: item.id,
          quantity: item.quantity,
        };
      })
    );
  } catch (e) {
    alert(e);
  }
};

const CartView = () => {
  const cartState = useSelector((state) => state.cart);

  async function handleTransaction() {
    await buy(cartState.cart);
  }

  return (
    <Container maxWidth={DIMENSIONS.PAGE_WIDTH + 'px'}>
      <SummaryContainer>
        <StyledMain>
          {cartState.cart.map((item, index) => (
            <CartItem
              key={index}
              itemName={item.name}
              price={item.price}
              quantity={item.quantity}
              image={'http://localhost:8080' + item.image}
            ></CartItem>
          ))}
          {cartState.cart.length > 0 && (
            <Button onClick={handleTransaction} width="230px">
              Buy
            </Button>
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
