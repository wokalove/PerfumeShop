import React from 'react';
import styled from 'styled-components';

export const StyledHomeSection = styled.section`
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 6rem;
`;

export const TitleContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 4rem;

    & > h1 {
        font-size: 2.25rem;
        font-weight: normal;
        letter-spacing: 0.05rem;
    }
`;

const HomeSection = ({ title, children }) => {
    return (
        <StyledHomeSection>
            <TitleContainer>
                <h1>{title}</h1>
            </TitleContainer>
            {children}
        </StyledHomeSection>
    );
};

export default HomeSection;
