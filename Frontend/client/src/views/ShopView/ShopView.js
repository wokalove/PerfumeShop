import Button from 'components/common/Button';
import Container from 'components/common/Container';
import TextInput from 'components/common/TextInput';
import DIMENSIONS from 'constants/dimensions';
import React from 'react';
import {
    MainTopBar,
    PageContainer,
    PaginationContainer,
    StyledAside,
    StyledMain,
    StyledPagination,
} from './styles';

const ShopView = () => {
    return (
        <Container maxWidth={DIMENSIONS.PAGE_WIDTH + 'px'}>
            <PageContainer>
                <StyledAside></StyledAside>
                <StyledMain>
                    <MainTopBar>
                        <form>
                            <TextInput
                                backgroundColor="#EFEFEF"
                                height="47px"
                                width="250px"
                                placeholder="Product name..."
                            />
                            <Button
                                backgroundColor="black"
                                height="47px"
                                width="140px"
                                type="submit"
                            >
                                Search
                            </Button>
                        </form>
                        <PaginationContainer>
                            <StyledPagination count={10} shape="rounded" />
                        </PaginationContainer>
                    </MainTopBar>
                </StyledMain>
            </PageContainer>
        </Container>
    );
};

export default ShopView;
