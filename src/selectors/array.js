import { createSelector } from 'reselect';

const getObject = object => object;

const arraySelector = createSelector([getObject], (object) => {
  if (typeof object === 'undefined' || Object.keys(object).length < 1) {
    return [];
  }
  return Object.keys(object).reduce((map, id) => {
    const newMap = [...map];
    newMap.push(object[id]);
    return newMap;
  }, []);
});

export default arraySelector;
