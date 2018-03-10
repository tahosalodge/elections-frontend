import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetchElections } from 'redux/state/election';
import { fetchCandidates } from 'redux/state/candidate';
import { fetchNominations } from 'redux/state/nomination';
import { fetchUnits } from 'redux/state/unit';
import { electionById } from 'selectors/elections';
import { unitForElection } from 'selectors/units';
import { candidatesForElection } from 'selectors/candidates';
import { nominationsForElection } from 'selectors/nominations';
import LoadingOrContent from 'components/LoadingOrContent';
import loadingShape from 'shapes/loading';
import { candidate as candidateMatchShape } from 'shapes/match';
import { arrayOfCandidates } from 'shapes/candidate';
import { arrayOfNominations } from 'shapes/nomination';
import electionShape from 'shapes/election';
import userShape from 'shapes/user';
import unitShape from 'shapes/unit';
import ElectionMenu from './ElectionMenu';
import ElectionPages from './pages';

const ElectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2em;

  @media print {
    display: none;
  }

  h1,
  p {
    margin: 0 !important;
  }
`;

class Election extends React.Component {
  static propTypes = {
    fetchElections: propTypes.func.isRequired,
    fetchCandidates: propTypes.func.isRequired,
    fetchNominations: propTypes.func.isRequired,
    fetchUnits: propTypes.func.isRequired,
    election: electionShape.isRequired,
    unit: unitShape.isRequired,
    candidates: arrayOfCandidates.isRequired,
    nominations: arrayOfNominations.isRequired,
    loading: loadingShape.isRequired,
    match: candidateMatchShape.isRequired,
    user: userShape.isRequired,
  };

  componentWillMount() {
    const { electionId } = this.props.match.params;
    this.props.fetchElections();
    this.props.fetchCandidates(electionId);
    this.props.fetchNominations(electionId);
    this.props.fetchUnits();
  }

  render() {
    const {
      election, unit, loading, candidates, nominations, user,
    } = this.props;
    const { number } = unit;
    return (
      <LoadingOrContent
        loading={
          loading.election ||
          loading.unit ||
          loading.user ||
          loading.candidates ||
          loading.nominations
        }
      >
        <ElectionHeader>
          <h1>
            Troop {number} - {election.season}
          </h1>
          <p>
            <strong>Election Status: {election.status}</strong>
          </p>
        </ElectionHeader>
        <ElectionMenu election={election} user={user} />
        <ElectionPages
          election={election}
          candidates={candidates}
          nominations={nominations}
          user={user}
        />
      </LoadingOrContent>
    );
  }
}

const mapStateToProps = (state, props) => {
  const election = electionById(state, props);
  return {
    election,
    unit: unitForElection(state, election),
    candidates: candidatesForElection(state, props),
    nominations: nominationsForElection(state, props),
    loading: state.loading,
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  fetchElections,
  fetchCandidates,
  fetchUnits,
  fetchNominations,
})(Election);
