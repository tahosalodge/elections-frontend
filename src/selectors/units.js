import { createSelector } from 'reselect';

const userUnitId = state => state.user.unit;
const getUnits = state => state.unit.items;
const electionUnitId = (state, election) => (election ? election.unitId : null);
const getUnitId = (state, unitId) => unitId;

export const unitForUser = createSelector(
  [userUnitId, getUnits],
  (unitId, units) => {
    if (unitId && units[unitId]) {
      return units[unitId];
    }
    return {};
  }
);

export const unitForElection = createSelector(
  [electionUnitId, getUnits],
  (unitId, units) => {
    if (unitId && units[unitId]) {
      return units[unitId];
    }
    return {};
  }
);

export const unitById = createSelector(
  [getUnitId, getUnits],
  (unitId, units) => {
    if (unitId && units[unitId]) {
      return units[unitId];
    }
    return {};
  }
);
