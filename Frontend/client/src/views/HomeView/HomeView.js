import Carousel, {
    autoplayPlugin,
    slidesToShowPlugin,
} from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import backgroundImage from 'assets/home-background.jpg';
import image from 'assets/pngegg.png';
import Container from 'components/common/Container';
import DIMENSIONS from 'constants/dimensions';
import React, { useState } from 'react';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import HomeSection from './components/HomeSection';
import {
    HomeImageWrapper,
    HomeProductsSection,
    RedSquare,
    StyledImg,
} from './styles';

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
                    <HomeSection title="New Products"></HomeSection>
                    <HomeSection title="Special Offers"></HomeSection>
                    <HomeProductsSection>
                        <Carousel
                            plugins={[
                                'infinite',

                                {
                                    resolve: slidesToShowPlugin,
                                    options: {
                                        numberOfSlides: 3,
                                    },
                                },
                                {
                                    resolve: autoplayPlugin,
                                    options: {
                                        interval: 2000,
                                    },
                                },
                            ]}
                            animationSpeed={1000}
                        >
                            <RedSquare />
                            <RedSquare />
                            <img src={image} />
                            <RedSquare />
                        </Carousel>
                        {/* <Dots
                            value={value}
                            onChange={handleChange}
                            number={slides.length}
                            plugins={[
                                'infinite',
                                'arrows',
                                {
                                    resolve: slidesToShowPlugin,
                                    options: {
                                        numberOfSlides: 2,
                                    },
                                },
                            ]}
                        /> */}
                    </HomeProductsSection>
                    <HomeProductsSection></HomeProductsSection>
                </main>
            </Container>
        </>
    );
};

export default HomeView;
