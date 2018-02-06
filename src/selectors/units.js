import { createSelector } from 'reselect';

const userUnitId = state => state.user.unit;
const getUnits = state => state.unit.items;
const electionUnitId = (state, election) => (election ? election.unitId : null);

export const unitForUser = createSelector([userUnitId, getUnits], (unitId, units) => {
  if (unitId && units[unitId]) {
    return units[unitId];
  }
  return {};
});

export const unitForElection = createSelector([electionUnitId, getUnits], (unitId, units) => {
  if (unitId && units[unitId]) {
    return units[unitId];
  }
  return {};
});
