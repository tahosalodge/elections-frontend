import React from 'react';
import { chapters } from 'constants/values';
import Select from './Select';

const SelectDistrict = () => (
  <Select label="District" id="chapter" options={chapters} labelKey="district" />
);
export default SelectDistrict;
