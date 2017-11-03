import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { loginRequest } from '../../redux/modules/login';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }
  submit(values) {
    this.props.loginRequest(values);
  }

  render() {
    const {
      handleSubmit, pristine, reset, submitting,
    } = this.props;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(this.submit)}>
          <div>
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" component="input" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field type="password" id="password" name="password" component="input" />
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

Login.propTypes = {
  handleSubmit: propTypes.func.isRequired,
  pristine: propTypes.bool.isRequired,
  reset: propTypes.func.isRequired,
  submitting: propTypes.bool.isRequired,
  loginRequest: propTypes.func.isRequired,
};

const mapStateToProps = state => ({
  login: state.login,
});

const connected = connect(mapStateToProps, { loginRequest })(Login);

export default reduxForm({
  form: 'login',
})(connected);
