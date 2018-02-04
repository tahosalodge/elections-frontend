import React, { Fragment as F } from 'react';

const Overview = ({ match }) => (
  <F>
    {JSON.stringify(match)}
    <h1>Hi, I'm the overview!</h1>
    <p>Election Date: 123</p>
    <button>Add Candidate</button>
    <button>Add Nomination</button>
  </F>
);

export default Overview;
