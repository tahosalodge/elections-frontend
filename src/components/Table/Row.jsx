import React from 'react';
import propTypes from 'prop-types';

const Row = ({ headers, data }) => {
  const processedData = headers.map((header) => {
    if (header.field === 'actions') {
      return header.component;
    }
    return data[header.field];
  });
  return <tr>{processedData.map(item => <td key={item}>{item}</td>)}</tr>;
};
Row.propTypes = {
  headers: propTypes.arrayOf(propTypes.object).isRequired,
  data: propTypes.object.isRequired,
};
export default Row;
