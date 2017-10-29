import React from 'react';
import ElectionMenu from './ElectionMenu';
import Table from '../Table';

const headers = ['Candidate', 'Status'];
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
        <Table headers={headers} data={data} />
        <h2>Nominations</h2>
        <Table headers={headers} data={data} />
      </div>
    );
  }
}

export default Election;
