import React from 'react';
import { chapters } from 'constants/values';
import Select from './Select';

const SelectChapter = () => (
  <Select label="Chapter" id="chapter" options={chapters} labelKey="chapter" />
);
export default SelectChapter;
