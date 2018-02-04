import propTypes from 'prop-types';

export default propTypes.shape({
  user: propTypes.bool.isRequired,
  unit: propTypes.bool.isRequired,
  election: propTypes.bool.isRequired,
  register: propTypes.bool.isRequired,
  candidate: propTypes.bool,
});
