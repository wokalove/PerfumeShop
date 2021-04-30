import Carousel, {
    arrowsPlugin,
    slidesToScrollPlugin,
    slidesToShowPlugin,
} from '@brainhubeu/react-carousel';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import CarouselButton from '../CarouselButton';

const StyledCarousel = styled(Carousel)`
    &:hover button {
        background-color: #efefef;
    }
`;

const CustomCarousel = ({ children }) => {
    return (
        <div>
            <StyledCarousel
                plugins={[
                    'infinite',
                    {
                        resolve: slidesToShowPlugin,
                        options: {
                            numberOfSlides: 3,
                        },
                    },
                    {
                        resolve: slidesToScrollPlugin,
                        options: {
                            numberOfSlides: 3,
                        },
                    },
                    {
                        resolve: arrowsPlugin,
                        options: {
                            arrowLeft: (
                                <CarouselButton>
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </CarouselButton>
                            ),
                            arrowRight: (
                                <CarouselButton>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </CarouselButton>
                            ),
                            addArrowClickHandler: true,
                        },
                    },
                ]}
                animationSpeed={2000}
            >
                {children}
            </StyledCarousel>
        </div>
    );
};

export default CustomCarousel;
