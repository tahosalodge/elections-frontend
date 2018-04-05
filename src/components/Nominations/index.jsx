import React from 'react';
import { Link } from 'react-router-dom';
import { arrayOfNominations } from 'shapes/nomination';
import Table from 'components/Table';

class Nominations extends React.PureComponent {
  static propTypes = {
    nominations: arrayOfNominations.isRequired,
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
      Cell: ({ value }) => <Link to={`/nominations/${value}`}>Edit</Link>,
    },
  ];

  render() {
    const { nominations } = this.props;
    return (
      <Table
        columns={this.columns()}
        data={nominations}
        notFoundMessage="No nominations entered."
      />
    );
  }
}

export default Nominations;
