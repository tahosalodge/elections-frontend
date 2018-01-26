import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

import { required } from 'components/Forms/validation';
import FieldWithLabel from './FieldWithLabel';
import SelectState from './SelectState';

const AddressStyles = styled.div``;
const Address = ({ prefix }) => (
  <AddressStyles>
    <FieldWithLabel
      label="Address"
      id={`${prefix}.address1`}
      className="address1"
      validate={[required]}
    />
    <FieldWithLabel label="City" id={`${prefix}.city`} className="city" validate={[required]} />
    <SelectState prefix={prefix} className="state" validate={[required]} />
    <FieldWithLabel label="ZIP" id={`${prefix}.zip`} className="zip" validate={[required]} />
  </AddressStyles>
);

Address.propTypes = {
  prefix: propTypes.string,
};

Address.defaultProps = {
  prefix: 'address',
};

export default Address;
