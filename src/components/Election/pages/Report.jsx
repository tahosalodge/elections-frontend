import React, { Fragment as F } from 'react';
import ElectionReport from 'components/Forms/ElectionReport';
import { arrayOfCandidates } from 'shapes/candidate';
import { election as matchShape } from 'shapes/match';
import electionShape from 'shapes/election';
import userShape from 'shapes/user';

const Report = ({
  match, election, candidates, user,
}) => (
  <F>
    <h1>Election Report</h1>
    {user.capability === 'unit' && <p>Units are not allowed to modify the election report.</p>}
    {user.capability !== 'unit' &&
      election.status === 'Results Entered' && (
        <p>
          Results may not be modified once submitted. Please contact elections@tahosalodge.org if
          you need to make any changes.
        </p>
      )}
    {user.capability !== 'unit' &&
      election.status !== 'Results Entered' && (
        <ElectionReport match={match} election={election} candidates={candidates} />
      )}
  </F>
);

Report.propTypes = {
  match: matchShape.isRequired,
  election: electionShape.isRequired,
  candidates: arrayOfCandidates.isRequired,
  user: userShape.isRequired,
};

export default Report;
