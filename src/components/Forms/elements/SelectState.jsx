import React from 'react';
import propTypes from 'prop-types';
import { states } from 'constants/values';
import Select from './Select';

const stateArray = Object.keys(states).map(state => ({ value: state, label: states[state] }));

const SelectState = ({ prefix, validate }) => (
  <Select label="State" id={`${prefix}.state`} options={stateArray} validate={validate} />
);

SelectState.propTypes = {
  prefix: propTypes.string.isRequired,
  validate: propTypes.arrayOf(propTypes.func),
};

SelectState.defaultProps = {
  validate: [],
};

export default SelectState;
