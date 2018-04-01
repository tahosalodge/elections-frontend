import { shape, string } from 'prop-types';

const userShape = shape({
  capability: string.isRequired,
  chapter: string,
  unit: string,
  token: string,
  fname: string,
  lname: string,
  email: string,
});

export default userShape;
