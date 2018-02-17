import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Overview from './Overview';
import AddCandidate from './AddCandidate';
import AddNomination from './AddNomination';
import Ballots from './Ballots';
import Report from './Report';
import Team from './Team';

const ElectionPages = electionProps => (
  <Switch>
    <Route
      exact
      path="/elections/:electionId"
      render={props => <Overview {...props} {...electionProps} />}
    />
    <Route
      path="/elections/:electionId/candidate"
      render={props => <AddCandidate {...props} {...electionProps} />}
    />
    <Route path="/elections/:electionId/nomination" component={AddNomination} />
    <Route
      path="/elections/:electionId/team"
      render={props => <Team {...props} {...electionProps} />}
    />
    <Route
      path="/elections/:electionId/report"
      render={props => <Report {...props} {...electionProps} />}
    />
    <Route
      path="/elections/:electionId/ballots"
      render={props => <Ballots {...props} {...electionProps} />}
    />
  </Switch>
);

export default ElectionPages;
