import { BASE } from 'constants/urls';
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

const OldPrice = styled.span`
  text-decoration: line-through;
  text-decoration-thickness: 3px;
  text-decoration-color: red;
`;

const ShopItem = ({ item, theBigOne, onClick }) => {
  return (
    <ItemWrapper theBigOne={theBigOne} onClick={onClick}>
      <Image src={BASE + item.image} alt="item image" theBigOne={theBigOne} />
      <DetailsContainer theBigOne={theBigOne}>
        <Name>{item.name}</Name>
        <span>{item.base_note}</span>
        <span>{item.volume} ml</span>
        <span>
          {item.new_price ? (
            <p>
              <OldPrice>{'$' + item.price}</OldPrice> ${item.new_price}
            </p>
          ) : (
            '$' + item.price
          )}
        </span>
      </DetailsContainer>
    </ItemWrapper>
  );
};

export default ShopItem;
