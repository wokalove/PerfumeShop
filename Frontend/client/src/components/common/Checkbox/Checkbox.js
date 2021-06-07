import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Checkmark, Container, Styledinput } from './styles';

const Checkbox = ({ className, label, checked, onChange }) => {
  return (
    <Container className={className}>
      {label}
      <Styledinput type="checkbox" checked={checked} onChange={onChange} />
      <Checkmark>
        <FontAwesomeIcon icon={faCheck} />
      </Checkmark>
    </Container>
  );
};

export default Checkbox;
