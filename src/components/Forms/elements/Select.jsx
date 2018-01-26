import React from 'react';
import propTypes from 'prop-types';
import { Field } from 'redux-form';

const Select = ({
  label, id, options, labelKey, validate,
}) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <Field type="select" id={id} name={id} component="select" validate={validate}>
      <option>---</option>
      {options.map(option => (
        <option key={`option-${option.value}`} value={option.value}>
          {option[labelKey]}
        </option>
      ))}
    </Field>
  </div>
);

Select.propTypes = {
  label: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  options: propTypes.arrayOf(propTypes.object).isRequired,
  labelKey: propTypes.string,
  validate: propTypes.arrayOf(propTypes.func),
};

Select.defaultProps = {
  labelKey: 'label',
  validate: [],
};

export default Select;
