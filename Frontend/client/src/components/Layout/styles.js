import img from 'assets/bottom-image2.jpg';
import styled from 'styled-components';

export const StyledImg = styled.div`
    width: 100%;
    min-height: 80vh;
    background-image: url(${img});
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    filter: grayscale(90%);
    margin-top: 8rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const TextWrapper = styled.div`
    color: white;
    mix-blend-mode: difference;
    font-size: 4rem;
    letter-spacing: 0.3rem;
`;
