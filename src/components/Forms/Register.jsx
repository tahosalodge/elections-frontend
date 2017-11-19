import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { registerRequest } from '../../redux/modules/register';

class Register extends React.Component {
  static propTypes = {
    handleSubmit: propTypes.func.isRequired,
    pristine: propTypes.bool.isRequired,
    reset: propTypes.func.isRequired,
    submitting: propTypes.bool.isRequired,
    registerRequest: propTypes.func.isRequired,
  };

  submit = values => this.props.registerRequest(values);

  render() {
    const {
      handleSubmit, pristine, reset, submitting,
    } = this.props;

    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit(this.submit)}>
          <h2>Register</h2>
          <div>
            <label htmlFor="fname">First Name</label>
            <Field type="text" id="fname" name="fname" component="input" />
          </div>
          <div>
            <label htmlFor="lname">Last Name</label>
            <Field type="text" id="lname" name="lname" component="input" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" component="input" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field type="password" id="password" name="password" component="input" />
          </div>
          <div>
            <label htmlFor="chapter">Chapter</label>
            <Field type="chapter" id="chapter" name="chapter" component="select">
              <option>---</option>
              <option value="spirit-eagle">Spirit Eagle</option>
            </Field>
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
  }
}

const mapStateToProps = state => ({
  register: state.signup,
});

const connected = connect(mapStateToProps, { registerRequest })(Register);

export default reduxForm({
  form: 'register',
})(connected);
