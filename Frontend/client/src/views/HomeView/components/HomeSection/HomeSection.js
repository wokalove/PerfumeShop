import React from 'react';
import styled from 'styled-components';

export const StyledHomeSection = styled.section`
    width: 100%;
    margin-bottom: 8rem;
`;

export const TitleContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 3rem;

    & > h1 {
        font-size: 2.25rem;
        font-weight: normal;
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
