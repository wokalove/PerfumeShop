import img from 'assets/bottom-image2.jpg';
import styled from 'styled-components';

export const StyledImg = styled.img`
    width: 100%;
    min-height: 80vh;
    background-image: url(${img});
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    filter: grayscale(90%);
    margin-top: 8rem;
`;
