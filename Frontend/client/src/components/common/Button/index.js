import { Button as MaterialButton } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled(MaterialButton)`
  && {
    font-family: 'Montserrat', sans-serif;
    font-weight: normal;
    text-transform: none;
    border-radius: 0;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    background-color: ${(props) => props.backgroundColor || 'black'};
    color: ${(props) => props.color || 'white'};
    font-size: ${(props) => props.fontSize || '1rem'};

    &:hover {
      background-color: ${(props) => props.backgroundColor || 'black'};
    }
  }
`;

const Button = (props) => {
  return <StyledButton {...props} />;
};

export default Button;
