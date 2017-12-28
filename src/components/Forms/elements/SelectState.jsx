import React from 'react';
import propTypes from 'prop-types';
import { states } from 'constants/values';
import Select from './Select';

const stateArray = Object.keys(states).map(state => ({ value: state, label: states[state] }));

const SelectState = ({ prefix }) => (
  <Select label="State" id={`${prefix}.state`} options={stateArray} />
);

SelectState.propTypes = {
  prefix: propTypes.string.isRequired,
};

export default SelectState;
