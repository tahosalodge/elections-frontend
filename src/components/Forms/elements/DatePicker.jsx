import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { Field } from 'redux-form';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

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

const DatePicker = ({
  label, id, initialMonth, disabledDays,
}) => (
  <StyledField>
    <label htmlFor={id}>{label}</label>
    <Field
      id={id}
      name={id}
      component={({ input }) => (
        <DayPickerInput
          value={input.value}
          name={input.name}
          onDayChange={day => input.onChange(day)}
          dayPickerProps={{
            initialMonth,
            disabledDays,
          }}
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
};

DatePicker.defaultProps = {
  initialMonth: new Date(),
  disabledDays: [],
};

export default DatePicker;
