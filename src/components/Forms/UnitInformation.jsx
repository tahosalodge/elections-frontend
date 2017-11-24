import React from 'react';
import propTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { FieldWithLabel, Button, Select, SelectDistrict, Address } from './fields';
import { adultLeadershipPositions } from '../../constants';

class UnitInformation extends React.Component {
  static propTypes = {
    handleSubmit: propTypes.func.isRequired,
    pristine: propTypes.bool.isRequired,
    submitting: propTypes.bool.isRequired,
  };

  submit = values => console.log(values);

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <div>
        <h1>Unit Information</h1>
        <form onSubmit={handleSubmit}>
          <FieldWithLabel label="Unit Number" id="unitNumber" />
          <SelectDistrict />
          <FieldWithLabel label="Active Members" id="activeMembers" />
          <Address />
          <h2>Unit Leader</h2>
          <FieldWithLabel label="First Name" id="unitLeader.fname" />
          <FieldWithLabel label="Last Name" id="unitLeader.lname" />
          <FieldWithLabel label="Phone" id="unitLeader.phone" type="phone" />
          <FieldWithLabel label="Email" id="unitLeader.email" type="email" />
          <Select
            label="Leadership Position"
            id="unitLeader.position"
            options={adultLeadershipPositions}
          />
          <h2>Adult Representative</h2>
          <FieldWithLabel label="First Name" id="adultRepresentative.fname" />
          <FieldWithLabel label="Last Name" id="adultRepresentative.lname" />
          <FieldWithLabel label="Phone" id="adultRepresentative.phone" type="phone" />
          <FieldWithLabel label="Email" id="adultRepresentative.email" type="email" />
          <h2>Youth Representative</h2>
          <FieldWithLabel label="First Name" id="youthRepresentative.fname" />
          <FieldWithLabel label="Last Name" id="youthRepresentative.lname" />
          <FieldWithLabel label="Phone" id="youthRepresentative.phone" type="phone" />
          <FieldWithLabel label="Email" id="youthRepresentative.email" type="email" />
          <Button text="Submit" disabled={pristine || submitting} />
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'unitInformation',
})(UnitInformation);
