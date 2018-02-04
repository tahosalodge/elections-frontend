import { parse, differenceInYears } from 'date-fns';

export function uniqueElectionDate(dates) {
  if (typeof dates === 'undefined') {
    return true;
  }
  function isDateInArray(needle, haystack) {
    for (let i = 0; i < haystack.length; i += 1) {
      if (parse(needle).getTime() === parse(haystack[i]).getTime()) {
        return true;
      }
    }
    return false;
  }

  const uniqueDates = [];
  for (let i = 0; i < dates.length; i += 1) {
    if (!isDateInArray(dates[i], uniqueDates)) {
      uniqueDates.push(dates[i]);
    }
  }

  if (dates.length === uniqueDates.length) {
    return true;
  }
  return false;
}

export const required = value => (value ? undefined : 'This field is required.');

export const maxLength = max => value =>
  (value && value.length > max ? `Must be ${max} characters or less` : undefined);

export const minLength = min => value =>
  (value && value.length < min ? `Must be ${min} characters or more` : undefined);

export const number = value =>
  (value && Number.isNaN(Number(value)) ? 'Must be a number' : undefined);

export const minValue = min => value =>
  (value && value < min ? `Must be at least ${min}` : undefined);

export const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined);

export const bsaId = (value) => {
  if ('012345'.indexOf(value) !== -1) {
    return 'Invalid BSA ID.';
  }
  if (!/[1-9]/i.test(value)) {
    return 'Invalid BSA ID.';
  }
  const idMinValidation = minLength(5)(value);
  if (idMinValidation) {
    return idMinValidation;
  }
  return undefined;
};

export const isYouth = (value) => {
  const age = differenceInYears(new Date(), parse(value));
  if (age > 20) {
    return `${age} seems a little old for a scout...`;
  }
  return undefined;
};
