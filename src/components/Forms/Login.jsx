import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { flow } from 'lodash';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { loginRequest } from 'redux/state/user';
import { required, email } from 'components/Forms/validation';
import { FieldWithLabel, Button, Form } from './elements';

const StyledLink = styled(Link)`
  text-align: center;
  display: block;
  color: black;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

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
        <Form onSubmit={handleSubmit(this.submit)}>
          <FieldWithLabel id="email" label="Email" validate={[required, email]} />
          <FieldWithLabel id="password" label="Password" type="password" validate={[required]} />
          <Button text="Login" disabled={pristine || submitting} />
          <StyledLink to="/reset-password">Forgot your password?</StyledLink>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  login: state.user,
});

export default flow(connect(mapStateToProps, { loginRequest }), reduxForm({ form: 'login' }))(Login);
