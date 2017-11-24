import React from 'react';
import propTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { FieldWithLabel, Button } from './fields';

class RequestElection extends React.Component {
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
        <h1>Request Election</h1>
        <form onSubmit={handleSubmit}>
          <FieldWithLabel id="date[1]" name="Date 1" />
          <FieldWithLabel id="date[2]" name="Date 2" />
          <FieldWithLabel id="date[3]" name="Date 3" />
          <Button text="Request Election" disabled={pristine || submitting} />
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'requestElection',
})(RequestElection);
