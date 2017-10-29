import React from 'react';
import Table from '../Table';

const headers = ['Unit', 'Chapter', 'Election Status', 'Candidates ', 'Elected', 'Nominations'];
const data = [
  {
    unit: 'Troop 633',
    chapter: 'White Eagle',
    electionStatus: 'Scheduled',
    candidates: 0,
    elected: 0,
    nominations: 0,
  },
  {
    unit: 'Troop 79',
    chapter: 'White Buffalo',
    electionStatus: 'Results Entered',
    candidates: 8,
    elected: 4,
    nominations: 1,
  },
];
// eslint-disable-next-line
class ElectionList extends React.Component {
  render() {
    return <Table headers={headers} data={data} />;
  }
}
export default ElectionList;
