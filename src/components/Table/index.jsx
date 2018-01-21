import React from 'react';
import propTypes from 'prop-types';
import ReactTable from 'react-table';
import styled from 'styled-components';
import 'react-table/react-table.css';

const TableStyles = styled.div`
  .ReactTable .rt-thead.-header {
    box-shadow: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .ReactTable .rt-thead {
    .rt-tr,
    .rt-td {
      text-align: left;
      padding: 0.25em;
    }
  }
`;

const Table = ({ columns, data, notFoundMessage }) => {
  if (data.length > 0) {
    return (
      <TableStyles>
        <ReactTable
          defaultPageSize={data.length}
          showPagination={false}
          columns={columns}
          data={data}
        />
      </TableStyles>
    );
  }
  return <p>{notFoundMessage}</p>;
};

Table.propTypes = {
  columns: propTypes.arrayOf(propTypes.object).isRequired,
  data: propTypes.arrayOf(propTypes.object).isRequired,
  notFoundMessage: propTypes.string,
};

Table.defaultProps = {
  notFoundMessage: 'Nothing to display',
};

export default Table;
export { default as ChapterCell } from './Chapter';
