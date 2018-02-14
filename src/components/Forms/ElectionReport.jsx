import React from 'react';
import propTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import flow from 'lodash/flow';
import { isEmpty } from 'lodash/lang';

import { fetchElections, updateElection } from 'redux/state/election';
import electionShape from 'shapes/election';
import candidateShape from 'shapes/candidate';
import { election as electionMatch } from 'shapes/match';
import { electionById } from 'selectors/elections';
import { FieldWithLabel, Button, Form } from './elements';

class ElectionReport extends React.Component {
  static propTypes = {
    handleSubmit: propTypes.func.isRequired,
    pristine: propTypes.bool.isRequired,
    submitting: propTypes.bool.isRequired,
    fetchElections: propTypes.func.isRequired,
    updateElection: propTypes.func.isRequired,
    match: electionMatch.isRequired,
    initialize: propTypes.func.isRequired,
    initialized: propTypes.bool.isRequired,
    election: electionShape.isRequired,
    user: propTypes.shape().isRequired,
    candidates: propTypes.arrayOf(candidateShape).isRequired,
  };

  componentDidMount() {
    const { election, initialize, initialized } = this.props;
    if (!isEmpty(election) && !initialized) {
      initialize({
        ...election,
      });
    }
    console.table(election);
  }

  submit = (values) => {
    const { match: { params } } = this.props;
    this.props.updateElection(params.electionId, values);
  };

  render() {
    const {
      handleSubmit, pristine, submitting, user, candidates,
    } = this.props;

    return (
      <div>
        <Form onSubmit={handleSubmit(this.submit)}>
          <FieldWithLabel id="youthAttendance" label="Youth Attendance" />
          <FieldWithLabel id="election1Ballots" label="Election #1 - Ballots Submitted" />
          <FieldWithLabel id="election2Ballots" label="Election #2 - Ballots Submitted" />
          <h3>Elected Candidates</h3>
          {candidates.map(({ fname, lname, _id }) => (
            <FieldWithLabel
              key={`candidates.${_id}`}
              label={`${fname} ${lname}`}
              id={`candidates.${_id}`}
              type="checkbox"
            />
          ))}
          <Button text="Submit Election Report" disabled={pristine || submitting} />
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  user: state.user,
  election: electionById(state, props),
});

export default flow(
  reduxForm({
    form: 'electionReport',
  }),
  connect(mapStateToProps, { fetchElections, updateElection, push }),
)(ElectionReport);
