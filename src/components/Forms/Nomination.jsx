import React from 'react';
import propTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

const Nomination = (props) => {
  const {
    handleSubmit, pristine, reset, submitting,
  } = props;
  return (
    <div>
      <h1>Candidate</h1>
      <form onSubmit={handleSubmit}>
        <h2>Contact Information</h2>
        <div>
          <label htmlFor="fname">First Name</label>
          <Field type="text" id="fname" name="fname" component="input" />
        </div>
        <div>
          <label htmlFor="lname">Last Name</label>
          <Field type="text" id="lname" name="lname" component="input" />
        </div>
        <div>
          <label htmlFor="bsaid">BSA ID</label>
          <Field type="text" id="bsaid" name="bsaid" component="input" />
        </div>
        <div>
          <label htmlFor="dob">Date of Birth</label>
          <Field type="text" id="dob" name="dob" component="input" />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <Field type="text" id="phone" name="phone" component="input" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Field type="email" id="email" name="email" component="input" />
        </div>
        <div>
          <label htmlFor="address.address1">Address 1</label>
          <Field type="text" id="address.address1" name="address.address1" component="input" />
        </div>
        <div>
          <label htmlFor="address.address2">Address 2</label>
          <Field type="text" id="address.address2" name="address.address2" component="input" />
        </div>
        <div>
          <label htmlFor="address.city">City</label>
          <Field type="text" id="address.city" name="address.city" component="input" />
        </div>
        <div>
          <label htmlFor="address.state">State</label>
          <Field type="select" id="address.state" name="address.state" component="select">
            <option>---</option>
            <option value="co">Colorado</option>
          </Field>
        </div>
        <div>
          <label htmlFor="address.zip">ZIP</label>
          <Field type="text" id="address.zip" name="address.zip" component="input" />
        </div>
        <h2>Eligibility Information</h2>
        <div>
          <label htmlFor="campingLongTerm">Long Term Camping</label>
          <Field type="text" id="campingLongTerm" name="campingLongTerm" component="input" />
        </div>
        <div>
          <label htmlFor="campingShortTerm">Short Term Camping</label>
          <Field type="text" id="campingShortTerm" name="campingShortTerm" component="input" />
        </div>
        <div>
          <label htmlFor="position">Leadership Position</label>
          <Field type="text" id="position" name="position" component="input" />
        </div>
        <div>
          <label htmlFor="recommendation">Recommendation</label>
          <Field type="text" id="recommendation" name="recommendation" component="input" />
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>
            Submit
          </button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
    </div>
  );
};

Nomination.propTypes = {
  handleSubmit: propTypes.func.isRequired,
  pristine: propTypes.bool.isRequired,
  reset: propTypes.func.isRequired,
  submitting: propTypes.bool.isRequired,
};

export default reduxForm({
  form: 'nomination',
})(Nomination);
