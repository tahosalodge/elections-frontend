import React from 'react';
import { chapters } from 'constants/values';
import { required } from 'components/Forms/validation';
import Select from './Select';

const SelectDistrict = () => (
  <Select
    label="District"
    id="chapter"
    options={chapters}
    labelKey="district"
    validate={[required]}
  />
);
export default SelectDistrict;
