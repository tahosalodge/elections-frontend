import React, { Fragment as F } from 'react';

const AddCandidate = ({ match }) => (
  <F>
    {JSON.stringify(match)}
    <h1>Candidate form goes here</h1>
  </F>
);

export default AddCandidate;
