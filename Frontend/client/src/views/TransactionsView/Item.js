import moment from 'moment';
import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.section`
  padding: 0.75rem;
  display: flex;
  margin: 1rem 0;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
`;

const Element = styled.div`
  width: 25%;
  display: flex;
  justify-content: center;
`;

const Item = ({ product }) => {
  return (
    <StyledContainer>
      <Element>
        <p>{product.product_name}</p>
      </Element>
      <Element>
        <p>{`price: $${product.price}`}</p>
      </Element>
      <Element>
        <p>{`quantity: ${product.quantity}`}</p>
      </Element>
      <Element>
        <p>{moment(product.date).format('DD/MM/YYYY')}</p>
      </Element>
    </StyledContainer>
  );
};

export default Item;
