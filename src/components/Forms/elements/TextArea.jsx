import React from 'react';
import propTypes from 'prop-types';
import { Field } from 'redux-form';

const TextArea = ({ label, id, validate }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <Field id={id} name={id} component="textarea" validate={validate} />
  </div>
);

TextArea.propTypes = {
  label: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  validate: propTypes.arrayOf(propTypes.func),
};

TextArea.defaultProps = {
  validate: [],
};

export default TextArea;
