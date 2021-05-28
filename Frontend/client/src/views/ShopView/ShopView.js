import { CircularProgress } from '@material-ui/core';
import image from 'assets/pngegg.png';
import axios from 'axiosConfig';
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
];

const ITEMS_PER_PAGE = 9;

const ShopView = () => {
  const backdropItemRef = useRef(null);
  const [backdrop, setBackdrop] = useState(false);
  const [backdropItemIndex, setBackdropItemIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [baseNotes, setBaseNotes] = useState([]);

  const [loadProducts, setLoadProducts] = useState(false);
  const [loadBrands, setLoadBrands] = useState(false);
  const [loadBaseNotes, setLoadBaseNotes] = useState(false);
  useOnClickOutside(backdropItemRef, () => setBackdrop(false));

  useEffect(() => {
    setMaxPage(Math.ceil(items.length / ITEMS_PER_PAGE));
  }, [items]);

  useEffect(() => {
    setLoadBrands(true);
    setLoadBaseNotes(true);

    const loadBrands = async () => {
      try {
        const tmpBrands = await axios.get('/brands');
        setBrands(tmpBrands.data);
      } catch (e) {
        alert(e);
      }
      setLoadBrands(false);
    };

    const loadBaseNotes = async () => {
      try {
        const tmpBaseNotes = await axios.get('/base-notes');
        setBaseNotes(tmpBaseNotes.data);
      } catch (e) {
        alert(e);
      }
      setLoadBaseNotes(false);
    };

    loadData();
    loadBrands();
    loadBaseNotes();
  }, []);

  async function loadData() {
    setLoadProducts(true);

    try {
      const tmpProducts = await axios.get('/products');
      setProducts(tmpProducts.data);
    } catch (e) {
      alert(e);
    }

    setLoadProducts(false);
  }

  function handleChange(event, value) {
    setPage(value);
  }

  function handleBackdropOpen(index) {
    setBackdropItemIndex(index);
    setBackdrop(true);
  }

  return (
    <Container maxWidth={DIMENSIONS.PAGE_WIDTH + 'px'}>
      <StyledBackdrop open={backdrop}>
        {backdrop && (
          <ItemDetails
            innerRef={backdropItemRef}
            imageSrc={image}
            name={products[backdropItemIndex].name}
            description={products[backdropItemIndex].description}
            price={products[backdropItemIndex].price}
            hide={() => setBackdrop(false)}
          />
        )}
      </StyledBackdrop>
      <PageContainer>
        <StyledAside>
          <LeftSection>
            <h1>Brands</h1>
            <CheckboxGroup>
              {loadBrands ? (
                <CircularProgress />
              ) : (
                brands.map((item, index) => (
                  <Checkbox key={index} label={item.name} />
                ))
              )}
            </CheckboxGroup>
          </LeftSection>
          <LeftSection>
            <h1>Base notes</h1>
            <CheckboxGroup>
              {loadBaseNotes ? (
                <CircularProgress />
              ) : (
                baseNotes.map((item, index) => (
                  <Checkbox key={index} label={item.name} />
                ))
              )}
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
            {loadProducts ? (
              <CircularProgress />
            ) : (
              products.map((item, index) => {
                if (
                  index >= (page - 1) * ITEMS_PER_PAGE &&
                  index < page * ITEMS_PER_PAGE
                )
                  return (
                    <ShopItem
                      key={index}
                      imageSrc={image}
                      price={item.price}
                      onClick={() => handleBackdropOpen(index)}
                    />
                  );
              })
            )}
          </ItemsContainer>
        </StyledMain>
      </PageContainer>
    </Container>
  );
};

export default ShopView;
