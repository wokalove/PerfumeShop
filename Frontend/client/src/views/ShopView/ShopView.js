import image from 'assets/pngegg.png';
import Button from 'components/common/Button';
import Checkbox from 'components/common/Checkbox';
import Container from 'components/common/Container';
import TextInput from 'components/common/TextInput';
import ItemDetails from 'components/ItemDetails';
import ShopItem from 'components/ShopItem';
import DIMENSIONS from 'constants/dimensions';
import useOnClickOutside from 'hooks/useOnClickOutside';
import React, { useEffect, useRef, useState } from 'react';
import {
    CheckboxGroup,
    ItemsContainer,
    LeftSection,
    MainTopBar,
    PageContainer,
    PaginationContainer,
    StyledAside,
    StyledBackdrop,
    StyledMain,
    StyledPagination,
} from './styles';

const descrition = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Cras malesuada dolor in lectus posuere rhoncus. Mauris a
nunc ac mi rutrum semper at et tortor. Curabitur commodo ex
eget lacus vehicula gravida.`;

const items = [
    {
        name: 'Product xyz1',
        description: descrition,
        imageSrc: image,
        price: 59.99,
    },
    {
        name: 'Product xyz2',
        description: descrition,
        imageSrc: image,
        price: 59.99,
    },
    {
        name: 'Product xyz3',
        description: descrition,
        imageSrc: image,
        price: 59.99,
    },
    {
        name: 'Product xyz',
        description: descrition,
        imageSrc: image,
        price: 59.99,
    },
    {
        name: 'Product xyz',
        description: descrition,
        imageSrc: image,
        price: 59.99,
    },
    {
        name: 'Product xyz',
        description: descrition,
        imageSrc: image,
        price: 59.99,
    },
    {
        name: 'Product xyz',
        description: descrition,
        imageSrc: image,
        price: 59.99,
    },
    {
        name: 'Product xyz',
        description: descrition,
        imageSrc: image,
        price: 59.99,
    },
    {
        name: 'Product xyz',
        description: descrition,
        imageSrc: image,
        price: 59.99,
    },
    {
        name: 'Product xyz',
        description: descrition,
        imageSrc: image,
        price: 59.99,
    },
    {
        name: 'Product xyz',
        description: descrition,
        imageSrc: image,
        price: 59.99,
    },
    {
        name: 'Product xyz',
        description: descrition,
        imageSrc: image,
        price: 59.99,
    },
    {
        name: 'Product xyz',
        description: descrition,
        imageSrc: image,
        price: 59.99,
    },
    {
        name: 'Product xyz',
        description: descrition,
        imageSrc: image,
        price: 59.99,
    },
    {
        name: 'Product xyz',
        description: descrition,
        imageSrc: image,
        price: 59.99,
    },
    {
        name: 'Product xyz',
        description: descrition,
        imageSrc: image,
        price: 59.99,
    },
    {
        name: 'Product xyz',
        description: descrition,
        imageSrc: image,
        price: 59.99,
    },
    {
        name: 'Product xyz',
        description: descrition,
        imageSrc: image,
        price: 59.99,
    },
    {
        name: 'Product xyz',
        description: descrition,
        imageSrc: image,
        price: 59.99,
    },
    {
        name: 'Product xyz',
        description: descrition,
        imageSrc: image,
        price: 59.99,
    },
    {
        name: 'Product xyz',
        description: descrition,
        imageSrc: image,
        price: 59.99,
    },
    {
        name: 'Product xyz',
        description: descrition,
        imageSrc: image,
        price: 59.99,
    },
    {
        name: 'Product xyz',
        description: descrition,
        imageSrc: image,
        price: 59.99,
    },
    {
        name: 'Product xyz',
        description: descrition,
        imageSrc: image,
        price: 59.99,
    },
    {
        name: 'Product xyz',
        description: descrition,
        imageSrc: image,
        price: 59.99,
    },
    {
        name: 'Product xyz',
        description: descrition,
        imageSrc: image,
        price: 59.99,
    },
    {
        name: 'Product xyz',
        description: descrition,
        imageSrc: image,
        price: 59.99,
    },
    {
        name: 'Product xyz',
        description: descrition,
        imageSrc: image,
        price: 59.99,
    },
];

const ITEMS_PER_PAGE = 9;

const ShopView = () => {
    const backdropItemRef = useRef(null);
    const [backdrop, setBackdrop] = useState(false);
    const [backdropItemIndex, setBackdropItemIndex] = useState(0);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    useOnClickOutside(backdropItemRef, () => setBackdrop(false));

    const handleChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        setMaxPage(Math.ceil(items.length / ITEMS_PER_PAGE));
    }, [items]);

    const handleBackdropOpen = (index) => {
        setBackdropItemIndex(index);
        setBackdrop(true);
    };

    return (
        <Container maxWidth={DIMENSIONS.PAGE_WIDTH + 'px'}>
            <StyledBackdrop open={backdrop}>
                {backdrop && (
                    <ItemDetails
                        innerRef={backdropItemRef}
                        imageSrc={image}
                        name={items[backdropItemIndex].name}
                        description={items[backdropItemIndex].description}
                        price={items[backdropItemIndex].price}
                        hide={() => setBackdrop(false)}
                    />
                )}
            </StyledBackdrop>
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
                            <StyledPagination
                                count={maxPage}
                                page={page}
                                onChange={handleChange}
                                shape="rounded"
                            />
                        </PaginationContainer>
                    </MainTopBar>
                    <ItemsContainer>
                        {items.map((item, index) => {
                            if (
                                index >= (page - 1) * ITEMS_PER_PAGE &&
                                index < page * ITEMS_PER_PAGE
                            )
                                return (
                                    <ShopItem
                                        key={index}
                                        imageSrc={item.imageSrc}
                                        price={index}
                                        onClick={() =>
                                            handleBackdropOpen(index)
                                        }
                                    />
                                );
                        })}
                    </ItemsContainer>
                </StyledMain>
            </PageContainer>
        </Container>
    );
};

export default ShopView;
