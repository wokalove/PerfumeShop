import styled from 'styled-components';

export const Container = styled.div`
    max-width: 503px;
    margin: 100px auto;
    padding: 0 20px;

    & > h1 {
        margin-left: 2rem;
        font-size: 1.5rem;
        font-weight: normal;
        margin-bottom: 1.625rem;
    }
`;

export const StyledForm = styled.form`
    width: 100%;
    margin-bottom: 1rem;

    & > * {
        margin-bottom: 1rem;
    }
`;

export const LinksWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;
