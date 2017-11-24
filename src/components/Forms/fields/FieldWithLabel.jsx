import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { Field } from 'redux-form';

const StyledField = styled.div`
  margin-bottom: 1em;

  label {
    margin-right: 1em;
    flex: 1;
  }

  input {
    font-size: 16px;
    padding: 2px;
  }
`;

const FieldWithLabel = ({ label, id, type }) => (
  <StyledField>
    <label htmlFor={id}>{label}</label>
    <Field type={type} id={id} name={id} component="input" />
  </StyledField>
);

FieldWithLabel.propTypes = {
  label: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  type: propTypes.string,
};

FieldWithLabel.defaultProps = {
  type: 'text',
};

export default FieldWithLabel;
