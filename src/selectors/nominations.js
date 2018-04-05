import { createSelector } from 'reselect';

const getElectionId = (state, props) => props.match.params.electionId;
const getCandidateId = (state, props) => props.match.params.nominationId;
const getCandidates = state => state.nomination.items;

export const nominationsForElection = createSelector(
  [getElectionId, getCandidates],
  (electionId, nominations) =>
    Object.keys(nominations)
      .filter(id => nominations[id].electionId === electionId)
      .reduce((map, id) => {
        const newMap = [...map];
        newMap.push(nominations[id]);
        return newMap;
      }, []),
);

export const nominationById = createSelector(
  [getCandidateId, getCandidates],
  (nominationId, nominations) => {
    if (nominationId && nominations[nominationId]) {
      return nominations[nominationId];
    }
    return {};
  },
);
