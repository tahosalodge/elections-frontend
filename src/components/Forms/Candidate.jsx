import React from 'react';
import propTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { FieldWithLabel, Address, Select, Button } from './fields';
import { ranks } from '../../constants';

class Candidate extends React.Component {
  static propTypes = {
    handleSubmit: propTypes.func.isRequired,
    pristine: propTypes.bool.isRequired,
    reset: propTypes.func.isRequired,
    submitting: propTypes.bool.isRequired,
  };

  submit = (values) => {
    console.log(values);
  };

  render() {
    const {
      handleSubmit, pristine, reset, submitting,
    } = this.props;
    return (
      <div>
        <h1>Candidate</h1>
        <form onSubmit={handleSubmit}>
          <h2>Contact Information</h2>
          <FieldWithLabel label="First name" id="fname" />
          <FieldWithLabel label="Last name" id="lname" />
          <FieldWithLabel label="BSA ID" id="lname" />
          <FieldWithLabel label="Date of Birth" id="dob" />
          <FieldWithLabel label="Parent Phone" id="parentPhone" />
          <FieldWithLabel label="Parent Email" id="parentEmail" />
          <FieldWithLabel label="Youth Phone" id="youthPhone" />
          <FieldWithLabel label="Youth Email" id="youthEmail" />
          <Address />

          <h2>Eligibility Information</h2>
          <FieldWithLabel label="Long Term Camping Nights" id="campingLongTerm" />
          <FieldWithLabel label="Short Term Camping Nights" id="campingShortTerm" />
          <Select label="Rank" id="rank" options={ranks} />
          <Button text="Submit" />
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'candidate',
})(Candidate);
