import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { registerRequest } from 'redux/state/register';
import Notices from 'components/Notices';
import { FieldWithLabel, Button, SelectChapter, Form } from './elements';

class Register extends React.Component {
  static propTypes = {
    handleSubmit: propTypes.func.isRequired,
    pristine: propTypes.bool.isRequired,
    submitting: propTypes.bool.isRequired,
    registerRequest: propTypes.func.isRequired,
    register: propTypes.shape().isRequired,
  };

  submit = values => this.props.registerRequest(values);

  render() {
    const {
      handleSubmit, pristine, submitting, register,
    } = this.props;

    return (
      <div>
        <h1>Register</h1>
        {register.errors && register.errors.length > 0 && <Notices notices={register.errors} />}
        <Form onSubmit={handleSubmit(this.submit)}>
          <FieldWithLabel id="fname" label="First Name" />
          <FieldWithLabel id="lname" label="Last Name" />
          <FieldWithLabel id="email" label="Email" type="email" />
          <FieldWithLabel id="password" label="Password" type="password" />
          <SelectChapter />
          <Button text="Register" disabled={pristine || submitting} />
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  register: state.register,
});

const connected = connect(mapStateToProps, { registerRequest })(Register);

export default reduxForm({
  form: 'register',
})(connected);
