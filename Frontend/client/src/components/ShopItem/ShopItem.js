import React from 'react';
import styled from 'styled-components';

export const ItemWrapper = styled.div`
    width: 300px;
    height: 360px;
`;

export const Image = styled.img`
    width: 100%;
    height: 300px;
    object-fit: contain;
`;

export const PriceContainer = styled.div`
    display: flex;
    justify-content: center;

    & > span {
        font-size: 1.875rem;
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
