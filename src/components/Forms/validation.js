export function uniqueElectionDate(dates) {
  if (typeof dates === 'undefined') {
    return true;
  }
  function isDateInArray(needle, haystack) {
    for (let i = 0; i < haystack.length; i += 1) {
      if (needle.getTime() === haystack[i].getTime()) {
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

export const required = value => (value ? undefined : 'Required');

export const maxLength = max => value =>
  (value && value.length > max ? `Must be ${max} characters or less` : undefined);

export const number = value =>
  (value && Number.isNaN(Number(value)) ? 'Must be a number' : undefined);

export const minValue = min => value =>
  (value && value < min ? `Must be at least ${min}` : undefined);

export const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined);
