import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { fetchElections } from 'redux/state/election';
import LoadingOrContent from 'components/LoadingOrContent';
import loadingShape from 'shapes/loading';
import electionShape from 'shapes/election';
import ElectionMenu from './ElectionMenu';
import Overview from './Overview';
import AddCandidate from './AddCandidate';
import AddNomination from './AddNomination';
import Ballots from './Ballots';
import Report from './Report';
import Team from './Team';

const ElectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2em;

  h1,
  p {
    margin: 0 !important;
  }
`;

class Election extends React.Component {
  static propTypes = {
    fetchElections: propTypes.func.isRequired,
    election: electionShape.isRequired,
    unit: propTypes.shape().isRequired,
    loading: loadingShape.isRequired,
  };

  componentWillMount() {
    this.props.fetchElections();
  }

  render() {
    const { election, unit, loading } = this.props;
    return (
      <LoadingOrContent loading={loading.election || loading.unit || loading.user}>
        <ElectionHeader>
          <h1>
            Troop {unit.number} - {election.season}
          </h1>
          <p>
            <strong>Election Status: {election.status}</strong>
          </p>
        </ElectionHeader>
        <ElectionMenu election={election} />
        <Switch>
          <Route exact path="/elections/:electionId" component={Overview} />
          <Route path="/elections/:electionId/candidate" component={AddCandidate} />
          <Route path="/elections/:electionId/nomination" component={AddNomination} />
          <Route path="/elections/:electionId/team" component={Team} />
          <Route path="/elections/:electionId/report" component={Report} />
          <Route path="/elections/:electionId/ballots" component={Ballots} />
        </Switch>
      </LoadingOrContent>
    );
  }
}

const mapStateToProps = ({
  election, unit, loading, user,
}, { match }) => ({
  election: election.items[match.params.electionId] || {},
  unit: unit.items[user.unit] || {},
  loading: {
    ...loading,
  },
});

export default connect(mapStateToProps, { fetchElections })(Election);
