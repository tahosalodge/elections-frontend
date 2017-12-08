import { createSelector } from 'reselect';

const getUnitId = (state, props) => props.match.params.id;
const getElections = state => state.election.items;

const getUnitElections = createSelector([getUnitId, getElections], (unitId, elections) => {
  console.log(unitId, elections);
  const unitElections = Object.keys(elections)
    .filter(electionId => elections[electionId].unit === unitId)
    .reduce((map, electionId) => {
      const newMap = [...map];
      newMap.push(elections[electionId]);
      return newMap;
    }, []);
  return unitElections;
});

export default getUnitElections;
