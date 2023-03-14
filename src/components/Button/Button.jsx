import React from 'react';
import PropTypes from 'prop-types';
import { Btn, BtnWrap } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <BtnWrap>
      <Btn onClick={onClick}>Load more</Btn>
    </BtnWrap>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};
