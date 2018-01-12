import React from 'react';
import propTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import addDays from 'date-fns/add_days';
import isBefore from 'date-fns/is_before';

import { createElection } from 'redux/state/election';
import Notices from 'components/Notices';
import { Button, DatePicker, Form } from './elements';
import { dateValidation } from './util';

class RequestElection extends React.Component {
  static propTypes = {
    handleSubmit: propTypes.func.isRequired,
    pristine: propTypes.bool.isRequired,
    submitting: propTypes.bool.isRequired,
    createElection: propTypes.func.isRequired,
    errors: propTypes.arrayOf(propTypes.shape()),
  };

  static defaultProps = {
    errors: [],
  }

  submit = values => this.props.createElection(values);

  prepareErrors = () => Object.keys(this.props.errors).map(error => ({
    body: this.props.errors[error].message,
    time: this.props.errors[error].time,
  }))

  render() {
    const {
      handleSubmit, pristine, submitting,
    } = this.props;
    const startDate = () => {
      const weekFromToday = addDays(Date.now(), 7);
      const jan1 = new Date(2018, 0, 1);
      if (isBefore(weekFromToday, jan1)) {
        return jan1;
      }
      return weekFromToday;
    };

    const disabledDays = [
      {
        daysOfWeek: [0, 6],
      },
      {
        before: startDate(),
        after: new Date(2018, 2, 31),
      },
    ];

    return (
      <div>
        <h1>Request Election</h1>
        <Notices notices={this.prepareErrors()} />
        <Form onSubmit={handleSubmit(this.submit)}>
          <DatePicker id="requestedDates[0]" label="Date 1" disabledDays={disabledDays} />
          <DatePicker id="requestedDates[1]" label="Date 2" disabledDays={disabledDays} />
          <DatePicker id="requestedDates[2]" label="Date 3" disabledDays={disabledDays} />
          <Button text="Request Election" disabled={pristine || submitting} />
        </Form>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = [];
  if (!dateValidation(values.requestedDates)) {
    errors.push({
      message: 'Please provide 3 unique dates.',
      time: new Date(),
    });
  }
  return errors;
};

const mapStateToProps = state => ({
  errors: state.form.requestElection ? state.form.requestElection.syncErrors : {},
});

const formed = reduxForm({
  form: 'requestElection',
  validate,
})(RequestElection);

export default connect(mapStateToProps, { createElection })(formed);
