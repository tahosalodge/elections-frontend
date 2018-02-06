import React, { Fragment as F } from 'react';
import Candidates from 'components/Candidates';

const Overview = ({ match, candidates }) => (
  <F>
    {JSON.stringify(match)}
    <h1>Hi, I'm the overview!</h1>
    <p>Election Date: 123</p>
    <Candidates candidates={candidates} />
    <button>Add Candidate</button>
    <button>Add Nomination</button>
  </F>
);

export default Overview;
