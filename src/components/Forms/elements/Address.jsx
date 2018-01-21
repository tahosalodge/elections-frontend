import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

import FieldWithLabel from './FieldWithLabel';
import SelectState from './SelectState';

const AddressStyles = styled.div``;
const Address = ({ prefix }) => (
  <AddressStyles>
    <FieldWithLabel label="Address" id={`${prefix}.address1`} className="address1" />
    <FieldWithLabel label="City" id={`${prefix}.city`} className="city" />
    <SelectState prefix={prefix} className="state" />
    <FieldWithLabel label="ZIP" id={`${prefix}.zip`} className="zip" />
  </AddressStyles>
);

Address.propTypes = {
  prefix: propTypes.string,
};

Address.defaultProps = {
  prefix: 'address',
};

export default Address;
