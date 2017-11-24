import React from 'react';
import propTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { FieldWithLabel, Address, Button } from './fields';

class Nomination extends React.Component {
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
        <h1>Candidate</h1>
        <form onSubmit={handleSubmit}>
          <h2>Contact Information</h2>
          <FieldWithLabel id="fname" label="First Name" />
          <FieldWithLabel id="lname" label="Last Name" />
          <FieldWithLabel id="bsaid" label="BSA ID" />
          <FieldWithLabel id="dob" label="Date of Birth" />
          <FieldWithLabel id="phone" label="Phone Number" type="phone" />
          <FieldWithLabel id="email" label="Email" type="email" />
          <Address />
          <h2>Eligibility Information</h2>
          <FieldWithLabel id="campingLongTerm" label="Long Term Camping" />
          <FieldWithLabel id="campingShortTerm" label="Short Term Camping" />
          <FieldWithLabel id="position" label="Leadership Position" />
          <Button text="Submit Nomination" disabled={pristine || submitting} />
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'nomination',
})(Nomination);
