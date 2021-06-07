import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  max-width: ${(props) => props.maxWidth || '100%'};
  padding: 0 24px;
  margin: 0 auto;
`;

const Container = ({ maxWidth, children }) => {
  return <StyledDiv maxWidth={maxWidth}>{children}</StyledDiv>;
};

export default Container;
