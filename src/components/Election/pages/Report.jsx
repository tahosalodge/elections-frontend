import React, { Fragment as F } from 'react';
import ElectionReport from 'components/Forms/ElectionReport';
import { arrayOfCandidates } from 'shapes/candidate';
import { election as matchShape } from 'shapes/match';
import electionShape from 'shapes/election';

const Report = ({ match, election, candidates }) => (
  <F>
    <h1>Election Report</h1>
    {election.status === 'Results Entered' && (
      <p>
        Results may not be modified once submitted. Please contact elections@tahosalodge.org if you
        need to make any changes.
      </p>
    )}
    {election.status !== 'Results Entered' && (
      <ElectionReport match={match} election={election} candidates={candidates} />
    )}
  </F>
);

Report.propTypes = {
  match: matchShape.isRequired,
  election: electionShape.isRequired,
  candidates: arrayOfCandidates.isRequired,
};

export default Report;
