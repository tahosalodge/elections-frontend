import React, { Fragment as F } from 'react';

const Overview = ({ match }) => (
  <F>
    {JSON.stringify(match)}
    <h1>Hi, I'm the overview!</h1>
  </F>
);

export default Overview;
