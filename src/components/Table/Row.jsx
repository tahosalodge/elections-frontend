import React from 'react';
import propTypes from 'prop-types';
import { format } from 'date-fns';

const Row = ({ headers, data, parentKey }) => {
  const cols = headers.map((header) => {
    if (header.field === 'actions') {
      return <td key={`${parentKey}-${header.field}`}>{header.component}</td>;
    }
    if (header.field === 'date') {
      return (
        <td key={`${parentKey}-${header.field}`}>
          {format(data[header.field], 'dddd, MMMM DD YYYY hh:mm A')}
        </td>
      );
    }
    return <td key={`${parentKey}-${header.field}`}>{data[header.field]}</td>;
  });
  return <tr>{cols}</tr>;
};
Row.propTypes = {
  headers: propTypes.arrayOf(propTypes.object).isRequired,
  data: propTypes.shape().isRequired,
  parentKey: propTypes.string.isRequired,
};
export default Row;
