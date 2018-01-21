import React from 'react';
import propTypes from 'prop-types';
import { Field } from 'redux-form';

const FieldWithLabel = ({ label, id, type }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <Field type={type} id={id} name={id} component="input" />
  </div>
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
