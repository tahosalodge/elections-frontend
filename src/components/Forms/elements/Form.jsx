import styled from 'styled-components';

const Form = styled.form`
  max-width: 400px;
  margin: auto;
  background: #f6f6f6;
  padding: 2em 4em;

  label {
    font-size: 0.8em;
    text-transform: uppercase;
    margin: 0 0 0.4em 0.4em;
    display: block;
  }

  input,
  select {
    font-size: 1.2em;
    padding: 4px;
    width: 100%;
    margin-bottom: 1em;
    border: 0;
  }

  select {
    appearance: none;
  }
`;

export default Form;
