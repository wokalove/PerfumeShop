import { CircularProgress, TextField } from '@material-ui/core';
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
  NumberIntputsContainer,
  PageContainer,
  PaginationContainer,
  StyledAside,
  StyledBackdrop,
  StyledMain,
  StyledPagination,
} from './styles';

const ITEMS_PER_PAGE = 9;

const genders = [
  {
    id: 1,
    name: 'Female',
  },
  {
    id: 2,
    name: 'Male',
  },
];

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

  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('');
  const [baseNote, setBaseNote] = useState('');
  const [gender, setGender] = useState('');
  const [volumeBottom, setVolumeBottom] = useState('');
  const [volumeTop, setVolumeTop] = useState('');
  const [priceBottom, setPriceBottom] = useState('');
  const [priceTop, setPriceTop] = useState('');

  useOnClickOutside(backdropItemRef, () => setBackdrop(false));

  useEffect(() => {
    setMaxPage(Math.ceil(products.length / ITEMS_PER_PAGE));
  }, [loadProducts]);

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
    let searchQuery = '?';
    searchQuery += search ? `name=${search}&` : '';
    searchQuery += brand ? `brand=${brand}&` : '';
    searchQuery += baseNote ? `base-note=${baseNote}&` : '';
    searchQuery += gender
      ? `for-women=${gender === 'Female' ? '1' : '0'}&`
      : '';
    searchQuery += volumeBottom ? `volume-bottom=${volumeBottom}&` : '';
    searchQuery += volumeTop ? `volume-top=${volumeTop}&` : '';
    searchQuery += priceBottom ? `price-bottom=${priceBottom}&` : '';
    searchQuery += priceTop ? `price-top=${priceTop}&` : '';

    try {
      const tmpProducts = await axios.get('/products' + searchQuery);
      setProducts(tmpProducts.data);
    } catch (e) {
      alert(e);
    }

    setLoadProducts(false);
  }

  useEffect(() => {
    loadData();
  }, [brand, baseNote, gender, volumeBottom, volumeTop, priceBottom, priceTop]);

  function handleChange(event, value) {
    setPage(value);
  }

  function handleBackdropOpen(index) {
    setBackdropItemIndex(index);
    setBackdrop(true);
  }

  function handleSearch(event) {
    event.preventDefault();
    loadData(true);
  }

  return (
    <Container maxWidth={DIMENSIONS.PAGE_WIDTH + 'px'}>
      <StyledBackdrop open={backdrop}>
        {backdrop && (
          <ItemDetails
            innerRef={backdropItemRef}
            item={products[backdropItemIndex]}
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
                  <Checkbox
                    key={index}
                    label={item.name}
                    onChange={() =>
                      setBrand((prev) => (prev === item.name ? '' : item.name))
                    }
                    checked={item.name === brand}
                  />
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
                  <Checkbox
                    key={index}
                    label={item.name}
                    onChange={() =>
                      setBaseNote((prev) =>
                        prev === item.name ? '' : item.name
                      )
                    }
                    checked={item.name === baseNote}
                  />
                ))
              )}
            </CheckboxGroup>
          </LeftSection>
          <LeftSection>
            <h1>Gender</h1>
            <CheckboxGroup>
              {genders.map((item) => (
                <Checkbox
                  key={item.id}
                  label={item.name}
                  onChange={() =>
                    setGender((prev) => (prev === item.name ? '' : item.name))
                  }
                  checked={item.name === gender}
                />
              ))}
            </CheckboxGroup>
          </LeftSection>
          <LeftSection>
            <h1>Volume</h1>
            <NumberIntputsContainer>
              <TextField
                type="number"
                label="Bottom"
                onChange={(event) => setVolumeBottom(event.target.value)}
              />
              <TextField
                type="number"
                label="Top"
                onChange={(event) => setVolumeTop(event.target.value)}
              />
            </NumberIntputsContainer>
          </LeftSection>
          <LeftSection>
            <h1>Price</h1>
            <NumberIntputsContainer>
              <TextField
                type="number"
                label="Bottom"
                onChange={(event) => setPriceBottom(event.target.value)}
              />
              <TextField
                type="number"
                label="Top"
                onChange={(event) => setPriceTop(event.target.value)}
              />
            </NumberIntputsContainer>
          </LeftSection>
        </StyledAside>
        <StyledMain>
          <MainTopBar>
            <form onSubmit={handleSearch}>
              <TextInput
                backgroundColor="#EFEFEF"
                height="47px"
                width="250px"
                placeholder="Product name..."
                onChange={(event) => setSearch(event.target.value)}
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
              products?.map((item, index) => {
                if (
                  index >= (page - 1) * ITEMS_PER_PAGE &&
                  index < page * ITEMS_PER_PAGE
                )
                  return (
                    <ShopItem
                      key={index}
                      item={item}
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
