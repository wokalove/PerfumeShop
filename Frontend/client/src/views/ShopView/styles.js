import { Backdrop } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import styled from 'styled-components';

export const PageContainer = styled.div`
  margin-top: 1rem;
  display: flex;
`;

export const StyledAside = styled.aside`
  width: 300px;
  margin-right: 2rem;
  margin-top: 47px;
`;

export const StyledMain = styled.main`
  width: 100%;
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

export const LeftSection = styled.section`
  margin-bottom: 2rem;

  & > h1 {
    font-weight: normal;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

export const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 0.2rem;

  & > * {
    margin-bottom: 0.8rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const ItemsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 6rem;

  & > * {
    margin-top: 5rem;
  }
`;

export const StyledBackdrop = styled(Backdrop)`
  && {
    z-index: 100;
  }
`;
