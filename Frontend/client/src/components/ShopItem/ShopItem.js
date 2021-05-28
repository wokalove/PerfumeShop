import React from 'react';
import styled from 'styled-components';

const ItemWrapper = styled.div`
  width: ${(props) => (props.theBigOne ? '300px' : '250px')};

  &:hover {
    cursor: pointer;

    & img {
      transform: scale(1.05);
    }
  }
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.theBigOne ? '300px' : '250px')};
  object-fit: contain;
  transition: transform ease-in-out 300ms;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Name = styled.span`
  font-weight: bold;
`;

const ShopItem = ({
  name,
  baseNote,
  volume,
  imageSrc,
  price,
  theBigOne,
  onClick,
}) => {
  return (
    <ItemWrapper theBigOne={theBigOne} onClick={onClick}>
      <Image src={imageSrc} alt="item image" theBigOne={theBigOne} />
      <DetailsContainer theBigOne={theBigOne}>
        <Name>{name}</Name>
        <span>{baseNote}</span>
        <span>{volume} ml</span>
        <span>${price}</span>
      </DetailsContainer>
    </ItemWrapper>
  );
};

export default ShopItem;
