import Pagination from '@material-ui/lab/Pagination';
import styled from 'styled-components';

export const PageContainer = styled.div`
    margin-top: 1rem;
    display: flex;
`;

export const StyledAside = styled.aside`
    width: 243px;
    height: 500px;
    background-color: red;
    margin-right: 1rem;
    margin-top: 47px;
`;

export const StyledMain = styled.main`
    width: 100%;
    height: 2000px;
`;

export const MainTopBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
`;

export const PaginationContainer = styled.div`
    display: flex;
    align-items: center;
    height: 47px;
`;

export const StyledPagination = styled(Pagination)`
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
`;
