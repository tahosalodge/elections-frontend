import React from 'react';
import propTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import electionShape from 'shapes/election';
import candidateShape from 'shapes/candidate';
import Overview from './Overview';
import AddCandidate from './AddCandidate';
import AddNomination from './AddNomination';
import Ballots from './Ballots';
import Report from './Report';
import Team from './Team';

const ElectionPages = ({ election, candidates }) => (
  <Switch>
    <Route
      exact
      path="/elections/:electionId"
      render={props => <Overview election={election} candidates={candidates} {...props} />}
    />
    <Route
      path="/elections/:electionId/candidate"
      render={props => <AddCandidate election={election} {...props} />}
    />
    <Route path="/elections/:electionId/nomination" component={AddNomination} />
    <Route
      path="/elections/:electionId/team"
      render={props => <Team election={election} {...props} />}
    />
    <Route
      path="/elections/:electionId/report"
      render={props => <Report election={election} {...props} />}
    />
    <Route
      path="/elections/:electionId/ballots"
      render={props => <Ballots election={election} candidates={candidates} {...props} />}
    />
  </Switch>
);

ElectionPages.propTypes = {
  election: electionShape,
  candidates: propTypes.arrayOf(candidateShape).isRequired,
};

export default ElectionPages;
