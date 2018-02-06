import React, { Fragment as F } from 'react';
import propTypes from 'prop-types';
import CandidateForm from 'components/Forms/Candidate';

import electionShape from 'shapes/election';

const AddCandidate = ({ match, election }) => (
  <F>
    <CandidateForm match={match} election={election} />
  </F>
);

AddCandidate.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      electionId: propTypes.string,
    }),
  }).isRequired,
  election: electionShape,
};

export default AddCandidate;
