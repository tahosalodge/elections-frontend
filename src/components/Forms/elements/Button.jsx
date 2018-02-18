import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from 'constants/values';

const ButtonStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em 0;

  button {
    background: ${colors.red};
    border: 0;
    color: white;
    font-size: 16px;
    padding: 0.5em 1em;
    width: 100%;
    max-width: 300px;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;
const Button = ({ type, text, disabled }) => (
  <ButtonStyles>
    <button type={type} disabled={disabled}>
      {text}
    </button>
  </ButtonStyles>
);

Button.propTypes = {
  type: propTypes.string,
  text: propTypes.string,
  disabled: propTypes.bool,
};

Button.defaultProps = {
  type: 'submit',
  disabled: false,
  text: 'Submit',
};

export default Button;
