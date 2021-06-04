import Button from 'components/common/Button';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const StyledContainer = styled.div`
  width: 300px;
  height: auto;
`;

const StyledHeader = styled.h1`
  font-size: 1.125rem;
  margin-top: 0.25rem;
  margin-bottom: 0.75rem;
  letter-spacing: 0.05rem;
`;

const ContentContainer = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
  padding-top: 0.5rem;
`;

const ContentElement = styled.div`
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
`;

const ContentElementHeader = styled(ContentElement)`
  letter-spacing: 0.05rem;
  text-transform: uppercase;
`;

const Total = styled(ContentElement)`
  border-width: 0;
  font-weight: bold;
  margin-top: 1rem;
`;

const delivery = 10;

function calculateNumberOfProducts(cart) {
  let number = 0;
  cart.forEach((item) => (number += item.quantity));
  return number;
}

function calculatePrice(cart) {
  let price = 0;
  cart.forEach(
    (item) => (price += item.new_price ?? item.price * item.quantity)
  );
  return price;
}

const Summary = ({ buy, loading }) => {
  const cartState = useSelector((state) => state.cart);

  return (
    <StyledContainer>
      <StyledHeader>Orders Summary:</StyledHeader>
      <ContentContainer>
        <ContentElementHeader>
          <p>Products:</p>
          <p>{calculateNumberOfProducts(cartState.cart)}</p>
        </ContentElementHeader>
        <ContentElement>
          <p>Price:</p>
          <p>${calculatePrice(cartState.cart)}</p>
        </ContentElement>
        <ContentElement>
          <p>Delivery:</p>
          <p>${delivery}</p>
        </ContentElement>
        <Total>
          <p>Total:</p>
          <p>${calculatePrice(cartState.cart) + delivery}</p>
        </Total>
      </ContentContainer>
      <Button width="100%" onClick={buy}>
        {loading ? 'loading...' : 'Buy'}
      </Button>
    </StyledContainer>
  );
};

export default Summary;
