import React from 'react';
import styled from 'styled-components';

export const ItemWrapper = styled.div`
    width: ${(props) => (props.theBigOne ? '300px' : '250px')};
`;

export const Image = styled.img`
    width: 100%;
    height: ${(props) => (props.theBigOne ? '300px' : '250px')};
    object-fit: contain;
`;

export const PriceContainer = styled.div`
    display: flex;
    justify-content: center;

    & > span {
        font-size: ${(props) => (props.theBigOne ? '1.875rem' : '1.2rem')};
    }
`;

const ShopItem = ({ imageSrc, price }) => {
    return (
        <ItemWrapper>
            <Image src={imageSrc} alt="item image" />
            <PriceContainer>
                <span>${price}</span>
            </PriceContainer>
        </ItemWrapper>
    );
};

export default ShopItem;
