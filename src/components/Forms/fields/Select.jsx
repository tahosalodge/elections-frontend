import React from 'react';
import propTypes from 'prop-types';
import { Field } from 'redux-form';

const Select = ({
  label, id, options, labelKey,
}) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <Field type="select" id={id} name={id} component="select">
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
};

Select.defaultProps = {
  labelKey: 'label',
};

export default Select;
