import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { registerRequest } from 'redux/state/register';
import { FieldWithLabel, Button, SelectChapter } from './elements';


class Register extends React.Component {
  static propTypes = {
    handleSubmit: propTypes.func.isRequired,
    pristine: propTypes.bool.isRequired,
    submitting: propTypes.bool.isRequired,
    registerRequest: propTypes.func.isRequired,
  };

  submit = values => this.props.registerRequest(values);

  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit(this.submit)}>
          <FieldWithLabel id="fname" label="First Name" />
          <FieldWithLabel id="lname" label="Last Name" />
          <FieldWithLabel id="email" label="Email" type="email" />
          <FieldWithLabel id="password" label="Password" type="password" />
          <SelectChapter />
          <Button text="Register" disabled={pristine || submitting} />
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
