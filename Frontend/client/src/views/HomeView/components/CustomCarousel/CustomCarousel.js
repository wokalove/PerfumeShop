import Carousel, { Dots, slidesToShowPlugin } from '@brainhubeu/react-carousel';
import React from 'react';

const CustomCarousel = ({ children }) => {
    return (
        <div>
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
            <Dots value={1} onChange={() => {}} number={4} />
        </div>
    );
};

export default CustomCarousel;
