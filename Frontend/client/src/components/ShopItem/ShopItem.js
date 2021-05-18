import React from 'react';
import styled from 'styled-components';

export const ItemWrapper = styled.div`
  width: ${(props) => (props.theBigOne ? '300px' : '250px')};

  &:hover {
    cursor: pointer;

    & img {
      transform: scale(1.1);
    }
  }
`;

export const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.theBigOne ? '300px' : '250px')};
  object-fit: contain;
  transition: transform ease-in-out 300ms;
`;

export const PriceContainer = styled.div`
  display: flex;
  justify-content: center;

  & > span {
    font-size: ${(props) => (props.theBigOne ? '1.6rem' : '1.2rem')};
  }
`;

const ShopItem = ({ imageSrc, price, theBigOne, onClick }) => {
  return (
    <ItemWrapper theBigOne={theBigOne} onClick={onClick}>
      <Image src={imageSrc} alt="item image" theBigOne={theBigOne} />
      <PriceContainer theBigOne={theBigOne}>
        <span>${price}</span>
      </PriceContainer>
    </ItemWrapper>
  );
};

export default ShopItem;
