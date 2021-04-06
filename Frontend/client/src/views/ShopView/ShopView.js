import Button from 'components/common/Button';
import Checkbox from 'components/common/Checkbox';
import Container from 'components/common/Container';
import TextInput from 'components/common/TextInput';
import DIMENSIONS from 'constants/dimensions';
import React from 'react';
import {
    CheckboxGroup,
    LeftSection,
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
                <StyledAside>
                    <LeftSection>
                        <h1>Brands</h1>
                        <CheckboxGroup>
                            <Checkbox label="Brand Name" />
                            <Checkbox label="Brand Name" />
                            <Checkbox label="Brand Name" />
                            <Checkbox label="Brand Name" />
                            <Checkbox label="Brand Name" />
                            <Checkbox label="Brand Name" />
                            <Checkbox label="Brand Name" />
                            <Checkbox label="Brand Name" />
                            <Checkbox label="Brand Name" />
                            <Checkbox label="Brand Name" />
                        </CheckboxGroup>
                    </LeftSection>
                    <LeftSection>
                        <h1>Gender</h1>
                        <CheckboxGroup>
                            <Checkbox label="Female" />
                            <Checkbox label="Male" />
                        </CheckboxGroup>
                    </LeftSection>
                    <LeftSection>
                        <h1>Price</h1>
                        <CheckboxGroup>
                            <Checkbox label="Any" />
                            <Checkbox label="€10 - €30" />
                            <Checkbox label="€30 - €50" />
                            <Checkbox label="€50 - €70" />
                            <Checkbox label="Over €70" />
                        </CheckboxGroup>
                    </LeftSection>
                </StyledAside>
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
