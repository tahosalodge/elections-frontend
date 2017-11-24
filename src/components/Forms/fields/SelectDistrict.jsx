import React from 'react';
import Select from './Select';
import { chapters } from '../../../constants';

const SelectDistrict = () => (
  <Select label="District" id="chapter" options={chapters} labelKey="district" />
);
export default SelectDistrict;
