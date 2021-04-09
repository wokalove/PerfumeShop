import backgroundImage from 'assets/home-background.jpg';
import Container from 'components/common/Container';
import DIMENSIONS from 'constants/dimensions';
import React from 'react';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import { HomeImageWrapper, HomeProductsSection, StyledImg } from './styles';

const HomeView = () => {
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
                    <HomeProductsSection></HomeProductsSection>
                    <HomeProductsSection></HomeProductsSection>
                </main>
            </Container>
        </>
    );
};

export default HomeView;
