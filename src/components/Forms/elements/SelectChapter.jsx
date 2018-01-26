import React from 'react';
import { chapters } from 'constants/values';
import { required } from 'components/Forms/validation';
import Select from './Select';

const SelectChapter = () => (
  <Select
    label="Chapter"
    id="chapter"
    options={chapters}
    labelKey="chapter"
    validate={[required]}
  />
);
export default SelectChapter;
