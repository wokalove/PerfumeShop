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

const Summary = () => {
  const cartState = useSelector((state) => state.cart);

  return (
    <StyledContainer>
      <StyledHeader>Orders Summary:</StyledHeader>
      <ContentContainer>
        <ContentElementHeader>
          <p>Products:</p>
          <p>{cartState.cart.length}</p>
        </ContentElementHeader>
        <ContentElement>
          <p>Price:</p>
          <p>0</p>
        </ContentElement>
        <ContentElement>
          <p>Delivery:</p>
          <p>{delivery}</p>
        </ContentElement>
        <Total>
          <p>Total:</p>
          <p>0</p>
        </Total>
      </ContentContainer>
      <Button width="100%">Buy</Button>
    </StyledContainer>
  );
};

export default Summary;
