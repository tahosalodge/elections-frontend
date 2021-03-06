import React from 'react';
import propTypes from 'prop-types';
import { Field, fieldPropTypes } from 'redux-form';

const renderField = ({
  input, label, type, meta: { touched, error, warning },
}) => (
  <div className={`FieldWithLabel-${type}`}>
    <label>{label}</label>
    <div>
      {touched &&
        ((error && <span className="form__error">{error}</span>) ||
          (warning && <span className="form__warning">{warning}</span>))}
      <input {...input} type={type} />
    </div>
  </div>
);

renderField.propTypes = {
  label: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  ...fieldPropTypes,
};

const FieldWithLabel = ({
  label, id, type, validate,
}) => (
  <Field type={type} id={id} name={id} label={label} component={renderField} validate={validate} />
);

FieldWithLabel.propTypes = {
  label: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  type: propTypes.string,
  validate: propTypes.arrayOf(propTypes.func),
};

FieldWithLabel.defaultProps = {
  type: 'text',
  validate: [],
};

export default FieldWithLabel;
