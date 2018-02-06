import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import candidateShape from 'shapes/candidate';
import Table from 'components/Table';

class Candidates extends React.PureComponent {
  static propTypes = {
    candidates: propTypes.arrayOf(candidateShape).isRequired,
  };

  columns = () => [
    {
      Header: 'First Name',
      accessor: 'fname',
    },
    {
      Header: 'Last Name',
      accessor: 'lname',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
    {
      Header: 'Edit',
      accessor: '_id',
      Cell: ({ value }) => <Link to={`/candidates/${value}`}>Edit</Link>,
    },
  ];

  render() {
    const { candidates } = this.props;
    return <Table columns={this.columns()} data={candidates} />;
  }
}

export default Candidates;
