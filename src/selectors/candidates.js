import { createSelector } from 'reselect';

const getElectionId = (state, props) => props.match.params.electionId;
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

export const eslint = () => null;
