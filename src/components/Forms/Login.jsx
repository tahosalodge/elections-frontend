import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { flow } from 'lodash';
import { loginRequest } from 'redux/state/user';
import { FieldWithLabel, Button } from './fields';

class Login extends React.Component {
  static propTypes = {
    handleSubmit: propTypes.func.isRequired,
    pristine: propTypes.bool.isRequired,
    submitting: propTypes.bool.isRequired,
    loginRequest: propTypes.func.isRequired,
  };

  submit = values => this.props.loginRequest(values);

  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(this.submit)}>
          <FieldWithLabel id="email" label="Email" />
          <FieldWithLabel id="password" label="Password" type="password" />
          <Button text="Login" disabled={pristine || submitting} />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  login: state.user,
});

export default flow(connect(mapStateToProps, { loginRequest }), reduxForm({ form: 'login' }))(Login);
