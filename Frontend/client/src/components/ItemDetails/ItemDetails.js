import Button from 'components/common/Button';
import React from 'react';
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

const ItemDetails = ({ imageSrc }) => {
    return (
        <Container>
            <Left>
                <Image src={imageSrc} alt="item image" />
                <Button backgroundColor="black" height="47px">
                    Add to Cart: $139
                </Button>
            </Left>
            <Right>
                <Title>Item Name</Title>
                <Description>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras malesuada dolor in lectus posuere rhoncus. Mauris a
                    nunc ac mi rutrum semper at et tortor. Curabitur commodo ex
                    eget lacus vehicula gravida.
                </Description>
            </Right>
        </Container>
    );
};

export default ItemDetails;
