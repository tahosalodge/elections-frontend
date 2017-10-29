import React from 'react';
import propTypes from 'prop-types';
import Row from './Row';

const Table = ({ headers, data }) => (
  <table>
    <thead>
      <tr>{headers.map(value => <th>{value}</th>)}</tr>
    </thead>
    <tbody>
      {data.map(item => <Row data={item} />)}
    </tbody>
  </table>
);

Table.propTypes = {
  headers: propTypes.array.isRequired,
  data: propTypes.array.isRequired,
};

export default Table;
