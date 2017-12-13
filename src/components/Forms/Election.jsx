import React from 'react';
import propTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { Button, DatePicker } from './fields';

class RequestElection extends React.Component {
  static propTypes = {
    handleSubmit: propTypes.func.isRequired,
    pristine: propTypes.bool.isRequired,
    submitting: propTypes.bool.isRequired,
  };

  submit = values => console.log(values);

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    const disabledDays = [
      {
        daysOfWeek: [0, 6],
      },
      {
        before: new Date(2018, 0, 1),
        after: new Date(2018, 2, 31),
      },
    ];
    return (
      <div>
        <h1>Request Election</h1>
        <form onSubmit={handleSubmit}>
          <DatePicker id="date[0]" label="Date 1" disabledDays={disabledDays} />
          <DatePicker id="date[1]" label="Date 2" disabledDays={disabledDays} />
          <DatePicker id="date[2]" label="Date 3" disabledDays={disabledDays} />
          <Button text="Request Election" disabled={pristine || submitting} />
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'requestElection',
})(RequestElection);
