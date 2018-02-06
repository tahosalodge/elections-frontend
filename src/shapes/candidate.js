import propTypes from 'prop-types';

export default propTypes.shape({
  _id: propTypes.string.isRequired,
  fname: propTypes.string.isRequired,
  lname: propTypes.string.isRequired,
  dob: propTypes.string.isRequired,
  bsaid: propTypes.number.isRequired,
  rank: propTypes.string.isRequired,
  election: propTypes.string.isRequired,
  address: propTypes.shape().isRequired,
  parentPhone: propTypes.string.isRequired,
  parentEmail: propTypes.string.isRequired,
  youthPhone: propTypes.string.isRequired,
  youthEmail: propTypes.string.isRequired,
  campingLongTerm: propTypes.string.isRequired,
  campingShortTerm: propTypes.string.isRequired,
  chapter: propTypes.string.isRequired,
  status: propTypes.string.isRequired,
  notified: propTypes.string.isRequired,
});