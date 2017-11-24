import React from 'react';
import propTypes from 'prop-types';

const Button = ({ type, text, disabled }) => (
  <div>
    <button type={type} disabled={disabled}>
      {text}
    </button>
  </div>
);

Button.propTypes = {
  type: propTypes.string,
  text: propTypes.string.isRequired,
  disabled: propTypes.bool,
};

Button.defaultProps = {
  type: 'submit',
  disabled: false,
};

export default Button;
