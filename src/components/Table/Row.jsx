import React from 'react';
import propTypes from 'prop-types';

const Row = ({ data }) => <tr>{Object.keys(data).map(item => <td>{data[item]}</td>)}</tr>;
Row.propTypes = {
  data: propTypes.object.isRequired,
};
export default Row;
