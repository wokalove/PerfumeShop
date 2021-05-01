import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    height: 30px;
    width: 120px;
    border: 1px solid black;
    display: flex;
`;

const Arrow = styled(Button)`
    && {
        width: 30px;
        min-width: 30px;
        background-color: transparent;
        color: black;
        margin: 0;
        padding: 0;
    }
`;

const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 60px;
`;

const Counter = () => {
    const [counter, setCounter] = useState(1);

    return (
        <Container>
            <Arrow
                onClick={() =>
                    setCounter((prev) => (prev >= 2 ? prev - 1 : prev))
                }
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </Arrow>
            <Content>
                <span>{counter}</span>
            </Content>
            <Arrow
                onClick={() =>
                    setCounter((prev) => (prev < 99 ? prev + 1 : prev))
                }
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </Arrow>
        </Container>
    );
};

export default Counter;
