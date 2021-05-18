import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Checkmark, Container, Styledinput } from './styles';

const Checkbox = ({ className, label }) => {
  const [checked, setChecked] = useState(false);

  return (
    <Container className={className}>
      {label}
      <Styledinput
        type="checkbox"
        checked={checked}
        onClick={() => setChecked((prev) => !prev)}
      />
      <Checkmark>
        <FontAwesomeIcon icon={faCheck} />
      </Checkmark>
    </Container>
  );
};

export default Checkbox;
