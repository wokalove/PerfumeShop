import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.section`
  width: 90%;
  height: 150px;
  padding: 0.75rem;
  display: flex;
  margin-bottom: 2rem;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
`;

const Image = styled.img`
  width: 120px;
  height: 100%;
  object-fit: contain;
  transition: transform ease-in-out 300ms;
  margin-right: 1rem;
`;

const DetailsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & h1 {
    font-size: 1.3rem;
    letter-spacing: 0.05rem;
  }

  & p {
    line-height: 1.4rem;
  }
`;

const Rigth = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  margin: 0.2rem 0;
`;

const CartItem = ({ image, itemName, quantity, price }) => {
  return (
    <StyledContainer>
      <Image src={image} />
      <DetailsContainer>
        <Left>
          <h1>{itemName}</h1>
          <div>
            <p>details1: details</p>
            <p>details2: details</p>
            <p>quantity: {parseInt(quantity)}</p>
          </div>
        </Left>
        <Rigth>
          <p>${parseInt(price) * parseInt(quantity)}</p>
          <p>remove</p>
        </Rigth>
      </DetailsContainer>
    </StyledContainer>
  );
};

export default CartItem;
