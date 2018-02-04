import styled from 'styled-components';
import { colors } from 'constants/values';
import downArrow from './downarrow.svg';

const Form = styled.form`
  max-width: 600px;
  margin: auto;
  background: #f6f6f6;
  padding: 2em 4em;

  label {
    font-size: 0.8em;
    text-transform: uppercase;
    margin: 0 0 0.4em;
    display: block;
  }

  input,
  select,
  textarea {
    font-size: 1.2em;
    padding: 4px;
    width: 100%;
    margin-bottom: 1em;
    border: 0;
  }

  select {
    appearance: none;
    background: #fff url(${downArrow}) no-repeat center center/contain;
    background-size: 12px;
    background-position: 95% center;
  }

  h2 em {
    font-weight: normal;
    font-size: 16px;
  }

  .form__error {
    color: ${colors.red};
    font-style: italic;
    margin-bottom: 0.4em;
  }
`;

export default Form;
