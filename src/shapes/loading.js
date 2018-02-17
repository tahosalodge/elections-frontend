import { shape, bool } from 'prop-types';

export default shape({
  user: bool.isRequired,
  unit: bool.isRequired,
  election: bool.isRequired,
  register: bool.isRequired,
  candidate: bool.isRequired,
});
