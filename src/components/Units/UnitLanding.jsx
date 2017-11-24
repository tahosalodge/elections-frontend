import React from 'react';

import Table from '../Table';

const headers = [
  {
    title: 'Year',
    field: 'year',
  },
  {
    title: 'Status',
    field: 'electionStatus',
  },
  {
    title: 'Candidates',
    field: 'candidates',
  },
  {
    title: 'Elected',
    field: 'elected',
  },
  {
    title: 'Nominations',
    field: 'nominations',
  },
];

const data = [
  {
    _id: 'lkj243598xc',
    year: '2018',
    electionStatus: 'Scheduled',
    candidates: 0,
    elected: 0,
    nominations: 0,
  },
  {
    _id: 'lkxcou34tlc',
    year: '2017',
    electionStatus: 'Results Entered',
    candidates: 8,
    elected: 4,
    nominations: 1,
  },
];
const UnitLanding = () => (
  <div>
    <h1>Troop 868</h1>
    <h2>Elections</h2>
    <Table headers={headers} data={data} />
    <button>Request Election</button>

    <h2>Leaders</h2>
    <Table headers={headers} data={data} />
    <button>Add Leader</button>
  </div>
);

export default UnitLanding;
