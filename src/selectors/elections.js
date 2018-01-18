import { createSelector } from 'reselect';

const getUnitId = (state, props) => props.match.params.unitId;
const getElections = state => state.election.items;
const getUnits = state => state.unit.items;

export const electionsByUnit = createSelector([getUnitId, getElections], (unitId, elections) => {
  const unitElections = Object.keys(elections)
    .filter(electionId => elections[electionId].unit === unitId)
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
    newMap.push({
      ...thisElection,
      unit: units[thisElection.unit],
    });
    return newMap;
  }, []);
  return electionsWithUnits;
});
