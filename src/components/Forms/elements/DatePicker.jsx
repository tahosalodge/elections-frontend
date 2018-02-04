import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { Field, fieldPropTypes } from 'redux-form';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

const StyledField = styled.div`
  margin-bottom: 1em;

  label {
    margin-right: 1em;
    flex: 1;
  }

  .DayPickerInput {
    width: 100%;
  }

  input {
    font-size: 16px;
    padding: 2px;
  }
`;

const RenderField = ({
  input: { name, value, onChange },
  label,
  meta: { error, warning },
  initialMonth,
  disabledDays,
}) => (
  <div>
    <label>{label}</label>
    <div>
      {value &&
        ((error && <span className="form__error">{error}</span>) ||
          (warning && <span className="form__warning">{warning}</span>))}
      <DayPickerInput
        value={value}
        name={name}
        onDayChange={day => onChange(day)}
        dayPickerProps={{
          initialMonth,
          disabledDays,
        }}
      />
    </div>
  </div>
);

RenderField.propTypes = {
  label: propTypes.string.isRequired,
  ...fieldPropTypes,
};

const DatePicker = ({
  label, id, initialMonth, disabledDays, validate,
}) => (
  <StyledField>
    <Field
      id={id}
      name={id}
      validate={validate}
      component={({ input, meta }) => (
        <RenderField
          label={label}
          input={input}
          initialMonth={initialMonth}
          disabledDays={disabledDays}
          meta={meta}
        />
      )}
    />
  </StyledField>
);

DatePicker.propTypes = {
  label: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  initialMonth: propTypes.instanceOf(Date),
  disabledDays: propTypes.arrayOf(propTypes.object),
  validate: propTypes.arrayOf(propTypes.func),
};

DatePicker.defaultProps = {
  initialMonth: new Date(),
  disabledDays: [],
  validate: [],
};

export default DatePicker;
