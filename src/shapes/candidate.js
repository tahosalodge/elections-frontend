import propTypes from 'prop-types';

const candidateShape = propTypes.shape({
  _id: propTypes.string.isRequired,
  fname: propTypes.string.isRequired,
  lname: propTypes.string.isRequired,
  dob: propTypes.string.isRequired,
  bsaid: propTypes.string.isRequired,
  rank: propTypes.string.isRequired,
  electionId: propTypes.string.isRequired,
  address: propTypes.shape().isRequired,
  parentPhone: propTypes.string.isRequired,
  parentEmail: propTypes.string.isRequired,
  youthPhone: propTypes.string,
  youthEmail: propTypes.string,
  campingLongTerm: propTypes.string.isRequired,
  campingShortTerm: propTypes.string.isRequired,
  chapter: propTypes.string.isRequired,
  status: propTypes.string.isRequired,
  notified: propTypes.string,
  unitId: propTypes.string.isRequired,
});

export const arrayOfCandidates = propTypes.arrayOf(candidateShape);

export default candidateShape;
