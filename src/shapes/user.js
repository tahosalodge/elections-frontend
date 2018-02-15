import { shape, string } from 'prop-types';

const userShape = shape({
  capability: string.isRequired,
  chapter: string.isRequired,
  unit: string,
  token: string.isRequired,
  fname: string.isRequired,
  lname: string.isRequired,
  email: string.isRequired,
});

export default userShape;
