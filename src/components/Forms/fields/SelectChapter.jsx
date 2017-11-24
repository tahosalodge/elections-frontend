import React from 'react';
import Select from './Select';
import { chapters } from '../../../constants';

const SelectChapter = () => (
  <Select label="Chapter" id="chapter" options={chapters} labelKey="chapter" />
);
export default SelectChapter;
