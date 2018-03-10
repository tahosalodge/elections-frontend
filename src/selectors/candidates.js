import { createSelector } from 'reselect';

const getElectionId = (state, props) => props.match.params.electionId;
const getCandidateId = (state, props) => props.match.params.candidateId;
const getCandidates = state => state.candidate.items;

export const candidatesForElection = createSelector(
  [getElectionId, getCandidates],
  (electionId, candidates) =>
    Object.keys(candidates)
      .filter(id => candidates[id].electionId === electionId)
      .reduce((map, id) => {
        const newMap = [...map];
        newMap.push(candidates[id]);
        return newMap;
      }, []),
);

export const candidateById = createSelector(
  [getCandidateId, getCandidates],
  (candidateId, candidates) => {
    if (candidateId && candidates[candidateId]) {
      return candidates[candidateId];
    }
    return {};
  },
);
