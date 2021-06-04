import '@brainhubeu/react-carousel/lib/style.css';
import backgroundImage from 'assets/home-background.jpg';
import axios from 'axiosConfig';
import Container from 'components/common/Container';
import ShopItem from 'components/ShopItem';
import DIMENSIONS from 'constants/dimensions';
import { BASE } from 'constants/urls';
import React, { useEffect, useState } from 'react';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import CustomCarousel from './components/CustomCarousel';
import HomeSection from './components/HomeSection';
import { HomeImageWrapper, StyledImg } from './styles';

const HomeView = () => {
  const [value, setValue] = useState(0);
  const [products, setProducts] = useState([]);
  const [productsWithOffers, setProductsWithOffers] = useState([]);

  useEffect(() => {
    const loadAllProducts = async () => {
      const res = await axios.get('products');
      setProducts(res.data.reverse().slice(0, 9));
    };

    const loadProductsWithSpecialOffers = async () => {
      const res = await axios.get('products?offer=true');
      setProductsWithOffers(res.data);
    };

    loadAllProducts();
    loadProductsWithSpecialOffers();
  }, []);

  const handleChange = (value) => {
    setValue(value);
  };

  return (
    <>
      <HomeImageWrapper>
        <ParallaxProvider>
          <Parallax y={[-50, 50]} tagOuter="figure">
            <StyledImg src={backgroundImage} alt="img" />
          </Parallax>
        </ParallaxProvider>
      </HomeImageWrapper>
      <Container maxWidth={DIMENSIONS.PAGE_WIDTH + 'px'}>
        <main>
          <HomeSection title="New Products">
            <CustomCarousel>
              {products.map((item) => (
                <ShopItem
                  theBigOne
                  imageSrc={BASE + item.image}
                  price={item.price}
                />
              ))}
            </CustomCarousel>
          </HomeSection>
          <HomeSection title="Special Offers">
            <CustomCarousel>
              {productsWithOffers.map((item) => (
                <ShopItem
                  theBigOne
                  imageSrc={BASE + item.image}
                  price={item.price}
                />
              ))}
            </CustomCarousel>
          </HomeSection>
        </main>
      </Container>
    </>
  );
};

export default HomeView;
