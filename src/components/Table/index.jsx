import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import Row from './Row';

const StyledTable = styled.table`
  border: 1px solid #dedede;
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1em;

  th {
    font-size: 1.2em;
    text-align: left;
  }

  th,
  td {
    border: 1px solid #dedede;
    padding: 0.6rem;
  }

  button {
    background: #cf3a43;
    padding: 0.5em 1em;
    color: white;
    font-size: 0.8em;
    border: 0;
    border-radius: 0;
  }
`;

const Table = ({ headers, data }) => (
  <StyledTable>
    <thead>
      <tr>{headers.map(value => <th key={value.title}>{value.title}</th>)}</tr>
    </thead>
    <tbody>
      {data.map(item => <Row key={item._id} parentKey={item._id} headers={headers} data={item} />)}
    </tbody>
  </StyledTable>
);

Table.propTypes = {
  headers: propTypes.arrayOf(propTypes.object).isRequired,
  data: propTypes.arrayOf(propTypes.object).isRequired,
};

export default Table;
