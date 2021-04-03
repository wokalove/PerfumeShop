import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    padding: 0 2rem;
    font-size: 1rem;
    border-width: 0;
    font-family: 'Montserrat', sans-serif;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    background-color: ${(props) => props.backgroundColor};
`;

const TextInput = (props) => {
    return <StyledInput {...props} />;
};

export default TextInput;
