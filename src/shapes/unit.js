import { shape, arrayOf, string, number } from 'prop-types';

const unitShape = shape({
  _id: string.isRequired,
  users: arrayOf(string).isRequired,
  pendingUsers: arrayOf(string).isRequired,
  number: string.isRequired,
  chapter: string.isRequired,
  activeMembers: number.isRequired,
  meetingLocation: shape({
    address1: string,
    city: string,
    state: string,
    zip: string,
    notes: string,
  }).isRequired,
  unitLeader: shape({
    fname: string,
    lname: string,
    phone: string,
    email: string,
    position: string,
  }).isRequired,
  meetingTime: string,
});

export const arrayOfUnits = arrayOf(unitShape);

export default unitShape;
