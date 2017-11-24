import React from 'react';
import styled from 'styled-components';
import FieldWithLabel from './FieldWithLabel';
import Select from './Select';

const states = [
  {
    label: 'Colorado',
    value: 'CO',
  },
];
const Address = () => (
  <div>
    <FieldWithLabel label="Address 1" id="address.address1" />
    <FieldWithLabel label="Address 2" id="address.address2" />
    <FieldWithLabel label="City" id="address.city" />
    <Select label="State" id="address.state" options={states} />
    <FieldWithLabel label="ZIP" id="address.zip" />
  </div>
);

export default Address;
