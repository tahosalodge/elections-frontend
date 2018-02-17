import { shape, string, arrayOf } from 'prop-types';

const electionShape = shape({
  _id: string.isRequired,
  requestedDates: arrayOf(string),
  unitId: string.isRequired,
  status: string.isRequired,
  season: string.isRequired,
  date: string.isRequired,
  chapter: string.isRequired,
});

export const arrayOfElections = arrayOf(electionShape);

export default electionShape;
