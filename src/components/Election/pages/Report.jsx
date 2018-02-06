import React, { Fragment as F } from 'react';

const Report = ({ match }) => (
  <F>
    {JSON.stringify(match)}
    <h1>Election Report</h1>
    <p>Registered youth</p>
    <p>In attendance</p>
    <p>Votes info</p>
    <p>Select Candidates</p>
  </F>
);

export default Report;
