import backgroundImage from 'assets/home-background.jpg';
import Container from 'components/common/Container';
import DIMENSIONS from 'constants/dimensions';
import React from 'react';
import { HomeImage } from './styles';

const HomeView = () => {
    return (
        <>
            <HomeImage src={backgroundImage} />
            <Container maxWidth={DIMENSIONS.PAGE_WIDTH + 'px'}>
                <main>xd</main>
            </Container>
        </>
    );
};

export default HomeView;
