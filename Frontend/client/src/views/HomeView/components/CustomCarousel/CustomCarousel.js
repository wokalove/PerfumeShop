import Carousel, { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import React from 'react';

const CustomCarousel = ({ children }) => {
    return (
        <Carousel
            plugins={[
                'infinite',
                'arrows',
                {
                    resolve: slidesToShowPlugin,
                    options: {
                        numberOfSlides: 3,
                    },
                },
            ]}
            animationSpeed={2000}
        >
            {children}
        </Carousel>
    );
};

export default CustomCarousel;
