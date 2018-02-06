import React, { Fragment as F } from 'react';

const Ballots = ({ match }) => (
  <F>
    {JSON.stringify(match)}
    <h1>Ballots</h1>
  </F>
);

export default Ballots;
