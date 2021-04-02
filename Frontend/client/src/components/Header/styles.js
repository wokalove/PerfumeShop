import styled from 'styled-components';

export const TopHeader = styled.div`
    background-color: black;
`;

export const TopHeaderContent = styled.div`
    & > ul {
        height: 35px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: white;
        font-weight: bold;
        text-transform: uppercase;
        font-size: 0.8rem;
        list-style-type: none;
        letter-spacing: 0.04em;

        & > li {
            margin-left: 3em;

            &:first-child {
                margin: 0;
            }
        }
    }
`;

export const MainHeaderContainer = styled.div`
    width: 100%;
    background-color: white;
    position: sticky;
    top: 0;
`;

export const MainHeader = styled.header`
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const StyledNav = styled.nav`
    & > ul {
        display: flex;
        list-style-type: none;
        text-transform: uppercase;
        color: #575757;
        letter-spacing: 0.02em;

        & > li {
            margin-left: 3rem;

            &:first-child {
                margin: 0;
            }
        }
    }
`;
