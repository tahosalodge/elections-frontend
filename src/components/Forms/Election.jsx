import React from 'react';
import propTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

const RequestElection = (props) => {
  const {
    handleSubmit, pristine, reset, submitting,
  } = props;
  return (
    <div>
      <h1>Request Election</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date[1]">Date 1</label>
          <Field type="text" id="date[1]" name="date[1]" component="input" />
        </div>
        <div>
          <label htmlFor="date[2]">Date 2</label>
          <Field type="text" id="date[2]" name="date[2]" component="input" />
        </div>
        <div>
          <label htmlFor="date[3]">Date 3</label>
          <Field type="text" id="date[3]" name="date[3]" component="input" />
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

RequestElection.propTypes = {
  handleSubmit: propTypes.func.isRequired,
  pristine: propTypes.bool.isRequired,
  reset: propTypes.func.isRequired,
  submitting: propTypes.bool.isRequired,
};

export default reduxForm({
  form: 'requestElection',
})(RequestElection);
