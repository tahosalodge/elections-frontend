import React from 'react';
import { Link } from 'react-router-dom';
import { arrayOfCandidates } from 'shapes/candidate';
import Table from 'components/Table';

class Candidates extends React.PureComponent {
  static propTypes = {
    candidates: arrayOfCandidates.isRequired,
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
    return (
      <Table
        columns={this.columns()}
        data={candidates}
        notFoundMessage="No candidates entered."
      />
    );
  }
}

export default Candidates;
