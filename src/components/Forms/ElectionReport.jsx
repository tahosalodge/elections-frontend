import React from 'react';
import propTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import flow from 'lodash/flow';
import { isEmpty } from 'lodash/lang';

import { fetchElections, reportElection } from 'redux/state/election';
import electionShape from 'shapes/election';
import { arrayOfCandidates } from 'shapes/candidate';
import { election as electionMatch } from 'shapes/match';
import { electionById } from 'selectors/elections';
import { FieldWithLabel, Button, Form } from './elements';

class ElectionReport extends React.Component {
  static propTypes = {
    handleSubmit: propTypes.func.isRequired,
    pristine: propTypes.bool.isRequired,
    submitting: propTypes.bool.isRequired,
    reportElection: propTypes.func.isRequired,
    match: electionMatch.isRequired,
    initialize: propTypes.func.isRequired,
    initialized: propTypes.bool.isRequired,
    election: electionShape.isRequired,
    candidates: arrayOfCandidates.isRequired,
  };

  componentDidMount() {
    const {
      election, initialize, initialized, candidates,
    } = this.props;
    const formCandidates = candidates.reduce((map, candidate) => {
      const newMap = {
        ...map,
        [candidate._id]: false,
      };
      return newMap;
    }, {});
    if (!isEmpty(election) && !initialized) {
      initialize({
        ...election,
        candidates: formCandidates,
      });
    }
  }

  submit = (values) => {
    const { match: { params } } = this.props;
    this.props.reportElection(params.electionId, { ...values, status: 'Results Entered' });
  };

  render() {
    const {
      handleSubmit, pristine, submitting, candidates,
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
  connect(mapStateToProps, { fetchElections, reportElection, push }),
)(ElectionReport);
