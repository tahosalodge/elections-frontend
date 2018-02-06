import React from 'react';
import propTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import addDays from 'date-fns/add_days';
import isBefore from 'date-fns/is_before';
import flow from 'lodash/flow';
import { isEmpty } from 'lodash/lang';
import { format } from 'date-fns';

import { createElection, updateElection } from 'redux/state/election';
import Notices from 'components/Notices';
import { Button, DatePicker, Form } from './elements';
import { uniqueElectionDate } from './validation';

class RequestElection extends React.Component {
  static propTypes = {
    handleSubmit: propTypes.func.isRequired,
    pristine: propTypes.bool.isRequired,
    submitting: propTypes.bool.isRequired,
    createElection: propTypes.func.isRequired,
    updateElection: propTypes.func.isRequired,
    errors: propTypes.arrayOf(propTypes.shape()),
    match: propTypes.shape({
      params: propTypes.shape({
        electionId: propTypes.string,
      }),
    }).isRequired,
    initialize: propTypes.func.isRequired,
    push: propTypes.func.isRequired,
    election: propTypes.shape(),
    user: propTypes.shape().isRequired,
    editing: propTypes.bool,
  };

  static defaultProps = {
    errors: [],
    election: {},
    editing: false,
  };

  componentDidMount() {
    const { match: { params: { electionId } }, election, initialize } = this.props;
    if (electionId) {
      if (isEmpty(election)) {
        this.props.push('/units/');
      }
      const { requestedDates, date } = election;
      const formattedDates =
        !isEmpty(requestedDates) && requestedDates.map(reqDate => format(reqDate, 'YYYY-M-D'));
      const formattedDate = date && format(date, 'YYYY-MM-DD');
      initialize({ requestedDates: formattedDates, date: formattedDate });
    }
  }

  submit = (values) => {
    const { match: { params } } = this.props;
    if (params.electionId) {
      this.props.updateElection(params.electionId, values);
    } else {
      this.props.createElection(params.unitId, values);
    }
  };

  prepareErrors = () =>
    Object.keys(this.props.errors).map(error => ({
      body: this.props.errors[error].message,
      time: this.props.errors[error].time,
    }));

  disabledDays = () => {
    const startDate = () => {
      const weekFromToday = addDays(Date.now(), 7);
      const jan1 = new Date(2018, 0, 1);
      if (isBefore(weekFromToday, jan1)) {
        return jan1;
      }
      return weekFromToday;
    };
    return [
      {
        daysOfWeek: [0, 6],
      },
      {
        before: startDate(),
        after: new Date(2018, 2, 31),
      },
    ];
  };

  render() {
    const {
      handleSubmit, pristine, submitting, user, editing,
    } = this.props;

    return (
      <div>
        <h1>{editing ? 'Edit' : 'Request'} Election</h1>
        <Notices notices={this.prepareErrors()} />
        <Form onSubmit={handleSubmit(this.submit)}>
          <DatePicker id="requestedDates[0]" label="Date 1" disabledDays={this.disabledDays()} />
          <DatePicker id="requestedDates[1]" label="Date 2" disabledDays={this.disabledDays()} />
          <DatePicker id="requestedDates[2]" label="Date 3" disabledDays={this.disabledDays()} />
          {user.capability !== 'unit' && <DatePicker id="date" label="Scheduled Date" />}
          <Button text="Request Election" disabled={pristine || submitting} />
        </Form>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = [];
  if (!uniqueElectionDate(values.requestedDates)) {
    errors.push({
      message: 'Please provide 3 unique dates.',
      time: new Date(),
    });
  }
  return errors;
};

const mapStateToProps = (state, props) => {
  const { path, params } = props.match;
  const toProps = {
    user: state.user,
  };
  if (path !== '/election/new') {
    toProps.election = state.election.items[params.electionId];
    toProps.editing = true;
  }
  return toProps;
};

export default flow(
  reduxForm({
    form: 'requestElection',
    validate,
  }),
  connect(mapStateToProps, { createElection, updateElection, push }),
)(RequestElection);
