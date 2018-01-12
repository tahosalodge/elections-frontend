export function dateValidation(dates) {
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

export function shutUpEsLint() {}
