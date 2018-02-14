import React, { Fragment as F } from 'react';
import ElectionReport from 'components/Forms/ElectionReport';

const Report = ({ match, election, candidates }) => (
  <F>
    <h1>Election Report</h1>
    <ElectionReport match={match} election={election} candidates={candidates} />
  </F>
);

export default Report;
