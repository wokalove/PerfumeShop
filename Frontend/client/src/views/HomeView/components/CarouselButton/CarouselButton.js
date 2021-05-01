import { Button as MaterialButton } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const Button = styled(MaterialButton)`
    && {
        background-color: white;
        width: 50px;
        height: 50px;
        border-radius: 5px;
        padding: 0;
        min-width: 0;
        color: black;
        font-size: 1.5rem;

        & svg {
            color: white;
        }
    }
`;

const CarouselButton = ({ children }) => {
    return <Button>{children}</Button>;
};

export default CarouselButton;
