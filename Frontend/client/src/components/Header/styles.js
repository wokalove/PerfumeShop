import DIMENSIONS from 'constants/dimensions';
import styled from 'styled-components';

export const TopHeader = styled.div`
    height: 46px;
    background-color: black;
`;

export const TopHeaderContainer = styled.div`
    width: ${DIMENSIONS.PAGE_WIDTH};
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: white;
`;
