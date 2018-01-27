import { createSelector } from 'reselect';

const getUnitId = (state, props) => props.match.params.unitId;
const getElectionId = (state, props) => props.match.params.electionId;
const getElections = state => state.election.items;
const getUnits = state => state.unit.items;

export const electionsByUnit = createSelector([getUnitId, getElections], (unitId, elections) => {
  const unitElections = Object.keys(elections)
    .filter(electionId => elections[electionId].unitId === unitId)
    .reduce((map, electionId) => {
      const newMap = [...map];
      newMap.push(elections[electionId]);
      return newMap;
    }, []);
  return unitElections;
});

export const electionUnitJoin = createSelector([getUnits, getElections], (units, elections) => {
  const electionsWithUnits = Object.keys(elections).reduce((map, electionId) => {
    const newMap = [...map];
    const thisElection = elections[electionId];
    if (units[thisElection.unitId]) {
      newMap.push({
        ...thisElection,
        unit: units[thisElection.unitId],
      });
    }
    return newMap;
  }, []);
  return electionsWithUnits;
});

export const electionById = createSelector(
  [getElectionId, getElections],
  (electionId, elections) => elections[electionId],
);
