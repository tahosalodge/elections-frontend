import React from 'react';
import propTypes from 'prop-types';
import { Field } from 'redux-form';

const TextArea = ({ label, id }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <Field id={id} name={id} component="textarea" />
  </div>
);

TextArea.propTypes = {
  label: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
};

export default TextArea;
