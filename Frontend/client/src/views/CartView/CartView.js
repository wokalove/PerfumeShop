import { removeFromCart } from 'actions/cartActions';
import axios from 'axiosConfig';
import Button from 'components/common/Button';
import Container from 'components/common/Container';
import DIMENSIONS from 'constants/dimensions';
import { BASE } from 'constants/urls';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Summary } from './components';
import CartItem from './components/CartItem';
import { StyledMain, SummaryContainer } from './styles';

const CartView = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const authState = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function buy(cart) {
    setLoading(true);

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
      dispatch(removeFromCart());
      navigate('../shop');
    } catch (e) {
      alert(e);
    }

    setLoading(false);
  }

  async function handleTransaction() {
    authState.isLoggedIn ? await buy(cartState.cart) : navigate('../login');
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
              image={BASE + item.image}
            ></CartItem>
          ))}
          {cartState.cart.length > 0 && (
            <Button onClick={handleTransaction} width="230px">
              {loading ? 'loading...' : 'Buy'}
            </Button>
          )}
        </StyledMain>
        <aside>
          <Summary buy={handleTransaction} loading={loading} />
        </aside>
      </SummaryContainer>
    </Container>
  );
};

export default CartView;
