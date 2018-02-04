import propTypes from 'prop-types';

export default propTypes.shape({
  _id: propTypes.string.isRequired,
  requestedDates: propTypes.arrayOf(propTypes.string),
  unitId: propTypes.string.isRequired,
  status: propTypes.string.isRequired,
  season: propTypes.string.isRequired,
  date: propTypes.string.isRequired,
});
