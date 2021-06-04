import '@brainhubeu/react-carousel/lib/style.css';
import backgroundImage from 'assets/home-background.jpg';
import image from 'assets/pngegg.png';
import axios from 'axiosConfig';
import Container from 'components/common/Container';
import ShopItem from 'components/ShopItem';
import DIMENSIONS from 'constants/dimensions';
import React, { useEffect, useState } from 'react';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import CustomCarousel from './components/CustomCarousel';
import HomeSection from './components/HomeSection';
import { HomeImageWrapper, StyledImg } from './styles';

const HomeView = () => {
  const [value, setValue] = useState(0);
  const [productsWithOffers, setProductsWithOffers] = useState([]);

  useEffect(() => {
    const loadProductsWithSpecialOffers = async () => {
      const res = await axios.get('products?offer=true');
      setProductsWithOffers(res.data);
    };
    loadProductsWithSpecialOffers();
  }, []);

  console.log(productsWithOffers);

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
              <ShopItem theBigOne imageSrc={image} price="59.99" />
              <ShopItem theBigOne imageSrc={image} price="59.99" />
              <ShopItem theBigOne imageSrc={image} price="59.99" />
              <ShopItem theBigOne imageSrc={image} price="59.99" />
              <ShopItem theBigOne imageSrc={image} price="59.99" />
            </CustomCarousel>
          </HomeSection>
          <HomeSection title="Special Offers">
            <CustomCarousel>
              <ShopItem theBigOne imageSrc={image} price="59.99" />
              <ShopItem theBigOne imageSrc={image} price="59.99" />
              <ShopItem theBigOne imageSrc={image} price="59.99" />
              <ShopItem theBigOne imageSrc={image} price="59.99" />
              <ShopItem theBigOne imageSrc={image} price="59.99" />
            </CustomCarousel>
          </HomeSection>
        </main>
      </Container>
    </>
  );
};

export default HomeView;
