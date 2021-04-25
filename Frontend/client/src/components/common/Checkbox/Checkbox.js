import React from 'react';
import { Checkmark, Container, Styledinput } from './styles';

const Checkbox = ({ className, label }) => {
    return (
        <Container className={className}>
            {label}
            <Styledinput type="checkbox" />
            <Checkmark></Checkmark>
        </Container>
    );
};

export default Checkbox;
