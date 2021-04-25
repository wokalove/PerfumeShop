import '@brainhubeu/react-carousel/lib/style.css';
import backgroundImage from 'assets/home-background.jpg';
import image from 'assets/pngegg.png';
import Container from 'components/common/Container';
import ShopItem from 'components/ShopItem';
import DIMENSIONS from 'constants/dimensions';
import React, { useState } from 'react';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import CustomCarousel from './components/CustomCarousel';
import HomeSection from './components/HomeSection';
import { HomeImageWrapper, RedSquare, StyledImg } from './styles';

const HomeView = () => {
    const [value, setValue] = useState(0);
    const [slides, setSlides] = useState([
        <RedSquare />,
        <RedSquare />,
        <RedSquare />,
        <RedSquare />,
        <RedSquare />,
        <RedSquare />,
        <RedSquare />,
        <RedSquare />,
    ]);

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
                            {/* //{slides.map((item, index) => item)} */}
                            <ShopItem
                                theBigOne
                                imageSrc={image}
                                price="59.99"
                            />
                            <ShopItem
                                theBigOne
                                imageSrc={image}
                                price="59.99"
                            />
                            <ShopItem
                                theBigOne
                                imageSrc={image}
                                price="59.99"
                            />
                            <ShopItem
                                theBigOne
                                imageSrc={image}
                                price="59.99"
                            />
                            <ShopItem
                                theBigOne
                                imageSrc={image}
                                price="59.99"
                            />
                        </CustomCarousel>
                    </HomeSection>
                    <HomeSection title="Special Offers">
                        <CustomCarousel>
                            {/* //{slides.map((item, index) => item)} */}
                            <ShopItem
                                theBigOne
                                imageSrc={image}
                                price="59.99"
                            />
                            <ShopItem
                                theBigOne
                                imageSrc={image}
                                price="59.99"
                            />
                            <ShopItem
                                theBigOne
                                imageSrc={image}
                                price="59.99"
                            />
                            <ShopItem
                                theBigOne
                                imageSrc={image}
                                price="59.99"
                            />
                            <ShopItem
                                theBigOne
                                imageSrc={image}
                                price="59.99"
                            />
                        </CustomCarousel>
                    </HomeSection>
                </main>
            </Container>
        </>
    );
};

export default HomeView;
