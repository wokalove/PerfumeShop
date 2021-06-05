import { addToCart } from 'actions/cartActions';
import Button from 'components/common/Button';
import Counter from 'components/Counter';
import { BASE } from 'constants/urls';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled, { keyframes } from 'styled-components';

const open = keyframes`
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
`;

const Container = styled.div`
  width: 600px;
  animation: ${open} 0.8s ease-in-out;
  border-radius: 0.25rem;
  display: flex;
  overflow: hidden;
`;

const Left = styled.div`
  height: inherit;
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  padding: 1rem;
`;

const Right = styled.div`
  height: inherit;
  width: 55%;
  background-color: rgba(255, 255, 255, 0.85);
  padding: 1rem;
`;

const Image = styled.img`
  width: 100%;
  object-fit: contain;
  transition: transform ease-in-out 300ms;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-weight: normal;
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  font-size: 1.1rem;
`;

const LeftBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  & > * {
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const QuantityContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  & h5 {
    width: auto;
    text-align: center;
    text-transform: uppercase;
  }

  & > * {
    margin-bottom: 0.2rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Details = styled.ul`
  list-style: none;
  margin-top: 1rem;

  & > li {
    border-bottom: 1px solid lightgray;
    padding: 1rem 0;

    &:first-child {
      border-top: 1px solid lightgray;
    }
  }
`;

const ItemDetails = ({ item, innerRef, hide }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleButtonClick = () => {
    dispatch(
      addToCart({
        name: item.name,
        descritpion: item.description,
        brand: item.brand,
        forWomen: item.for_women,
        id: item.id,
        image: item.image,
        price: item.price,
        quantity,
      })
    );
    hide();
  };

  return (
    <Container ref={innerRef}>
      <Left>
        <Image src={BASE + item.image} alt="item image" />
        <LeftBottom>
          <QuantityContainer>
            <h5>Quantity</h5>
            <Counter counter={quantity} setCounter={setQuantity} />
          </QuantityContainer>
          <Button
            backgroundColor="black"
            height="47px"
            width="100%"
            onClick={handleButtonClick}
          >
            Add to Cart: ${item.new_price ?? item.price * quantity}
          </Button>
        </LeftBottom>
      </Left>
      <Right>
        <Title>{item.name}</Title>
        <Description>{item.description}</Description>
        <Details>
          <li>Base Note: {item.base_note}</li>
          <li>Volume: {item.volume}</li>
        </Details>
      </Right>
    </Container>
  );
};

export default ItemDetails;
