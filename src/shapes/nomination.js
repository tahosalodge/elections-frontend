import { string, shape, arrayOf } from 'prop-types';

const nominationShape = shape({
  _id: string.isRequired,
  fname: string.isRequired,
  lname: string.isRequired,
  dob: string.isRequired,
  bsaid: string.isRequired,
  electionId: string.isRequired,
  address: shape().isRequired,
  phone: string.isRequired,
  email: string.isRequired,
  campingLongTerm: string.isRequired,
  campingShortTerm: string.isRequired,
  chapter: string.isRequired,
  status: string.isRequired,
  position: string.isRequired,
  notified: string,
  unitId: string.isRequired,
});

export const arrayOfNominations = arrayOf(nominationShape);

export default nominationShape;
