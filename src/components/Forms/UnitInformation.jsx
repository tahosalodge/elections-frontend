import React from 'react';
import propTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

const UnitInformation = (props) => {
  const {
    handleSubmit, pristine, reset, submitting,
  } = props;
  return (
    <div>
      <h1>Unit Information</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="unitNumber">Unit Number</label>
          <Field type="number" id="unitNumber" name="unitNumber" component="input" />
        </div>
        <div>
          <label htmlFor="district">District</label>
          <Field type="select" id="district" name="district" component="select">
            <option>---</option>
            <option value="spirit-eagle">Pioneer Trails</option>
            <option value="spirit-eagle">Pioneer Trails</option>
          </Field>
        </div>
        <div>
          <label htmlFor="activeMembers">Active Members</label>
          <Field type="number" id="activeMembers" name="activeMembers" component="input" />
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
            <option value="co">Colorado</option>
          </Field>
        </div>
        <div>
          <label htmlFor="address.zip">ZIP</label>
          <Field type="text" id="address.zip" name="address.zip" component="input" />
        </div>
        <h2>Unit Leader</h2>
        <div>
          <label htmlFor="unitLeaderFName">First Name</label>
          <Field type="text" id="unitLeaderFName" name="unitLeader.fname" component="input" />
        </div>
        <div>
          <label htmlFor="unitLeaderLName">Last Name</label>
          <Field type="text" id="unitLeaderLName" name="unitLeader.lname" component="input" />
        </div>
        <div>
          <label htmlFor="unitLeaderPhone">Phone</label>
          <Field type="text" id="unitLeaderPhone" name="unitLeader.phone" component="input" />
        </div>
        <div>
          <label htmlFor="unitLeaderEmail">Email</label>
          <Field type="email" id="unitLeaderEmail" name="unitLeader.email" component="input" />
        </div>
        <div>
          <label htmlFor="unitLeaderPosition">District</label>
          <Field
            type="select"
            id="unitLeaderPosition"
            name="unitLeader.position"
            component="select"
          >
            <option>---</option>
            <option value="scoutmaster">Scoutmaster</option>
            <option value="assistant-scoutmaster">Assistant Scoutmaster</option>
            <option value="committee-chair">Committee Chair</option>
            <option value="advancement-chair">Advancement Chair</option>
          </Field>
        </div>
        <h2>Adult Representative</h2>
        <div>
          <label htmlFor="adultRepresentativeFName">First Name</label>
          <Field
            type="text"
            id="adultRepresentativeFName"
            name="adultRepresentative.fname"
            component="input"
          />
        </div>
        <div>
          <label htmlFor="adultRepresentativeLName">Last Name</label>
          <Field
            type="text"
            id="adultRepresentativeLName"
            name="adultRepresentative.lname"
            component="input"
          />
        </div>
        <div>
          <label htmlFor="adultRepresentativePhone">Phone</label>
          <Field
            type="text"
            id="adultRepresentativePhone"
            name="adultRepresentative.phone"
            component="input"
          />
        </div>
        <div>
          <label htmlFor="adultRepresentativeEmail">Email</label>
          <Field
            type="email"
            id="adultRepresentativeEmail"
            name="adultRepresentative.email"
            component="input"
          />
        </div>
        <h2>Youth Representative</h2>
        <div>
          <label htmlFor="youthRepresentativeFName">First Name</label>
          <Field
            type="text"
            id="youthRepresentativeFName"
            name="youthRepresentative.fname"
            component="input"
          />
        </div>
        <div>
          <label htmlFor="youthRepresentativeLName">Last Name</label>
          <Field
            type="text"
            id="youthRepresentativeLName"
            name="youthRepresentative.lname"
            component="input"
          />
        </div>
        <div>
          <label htmlFor="youthRepresentativePhone">Phone</label>
          <Field
            type="text"
            id="youthRepresentativePhone"
            name="youthRepresentative.phone"
            component="input"
          />
        </div>
        <div>
          <label htmlFor="youthRepresentativeEmail">Email</label>
          <Field
            type="email"
            id="youthRepresentativeEmail"
            name="youthRepresentative.email"
            component="input"
          />
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

UnitInformation.propTypes = {
  handleSubmit: propTypes.func.isRequired,
  pristine: propTypes.bool.isRequired,
  reset: propTypes.func.isRequired,
  submitting: propTypes.bool.isRequired,
};

export default reduxForm({
  form: 'unitInformation',
})(UnitInformation);
