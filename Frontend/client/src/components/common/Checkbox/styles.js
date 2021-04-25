import styled from 'styled-components';

export const Container = styled.label`
    position: relative;
    padding-left: 2.5rem;
    cursor: pointer;
    font-size: 1rem;
    user-select: none;
    color: black;

    & > input:checked ~ span {
        background-color: pink;
        border-color: pink;
    }
`;

export const Styledinput = styled.input`
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
`;

export const Checkmark = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1.375rem;
    width: 1.375rem;
    border-radius: 0.3125rem;
    border: 1px solid black;
    transition: background-color ease-in-out 250ms,
        border-color ease-in-out 250ms;
`;
