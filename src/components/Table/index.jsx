import React from 'react';
import propTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './index.css';

const Table = ({ columns, data, notFoundMessage }) => {
  if (data.length > 0) {
    return (
      <ReactTable
        defaultPageSize={data.length}
        showPagination={false}
        columns={columns}
        data={data}
      />
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
