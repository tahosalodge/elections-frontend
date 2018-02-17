import { string, shape, arrayOf } from 'prop-types';

const candidateShape = shape({
  _id: string.isRequired,
  fname: string.isRequired,
  lname: string.isRequired,
  dob: string.isRequired,
  bsaid: string.isRequired,
  rank: string.isRequired,
  electionId: string.isRequired,
  address: shape().isRequired,
  parentPhone: string.isRequired,
  parentEmail: string.isRequired,
  youthPhone: string,
  youthEmail: string,
  campingLongTerm: string.isRequired,
  campingShortTerm: string.isRequired,
  chapter: string.isRequired,
  status: string.isRequired,
  notified: string,
  unitId: string.isRequired,
});

export const arrayOfCandidates = arrayOf(candidateShape);

export default candidateShape;
