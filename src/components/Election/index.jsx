import React from 'react';
import Table from 'components/Table';
import ElectionMenu from './ElectionMenu';

const columns = [
  {
    Header: 'Candidate',
    accessor: 'candidate',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
];
const data = [
  {
    candidate: 'Del Bolinske',
    status: 'Not Elected',
  },
];

// eslint-disable-next-line
class Election extends React.Component {
  render() {
    return (
      <div>
        <h1>Election Title</h1>
        <ElectionMenu />
        <p>
          <strong>Election Status:</strong> Results Entered
        </p>
        <h2>Candidates</h2>
        <Table columns={columns} data={data} />
        <h2>Nominations</h2>
        <Table columns={columns} data={data} />
      </div>
    );
  }
}

export default Election;
