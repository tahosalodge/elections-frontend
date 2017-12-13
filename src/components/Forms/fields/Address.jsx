import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

import FieldWithLabel from './FieldWithLabel';
import SelectState from './SelectState';

const AddressStyles = styled.div``;
const Address = ({ prefix }) => (
  <AddressStyles>
    <FieldWithLabel label="Address 1" id={`${prefix}.address1`} className="address1" />
    <FieldWithLabel label="Address 2" id={`${prefix}.address2`} className="address2" />
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
