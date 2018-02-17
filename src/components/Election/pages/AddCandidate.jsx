import React, { Fragment as F } from 'react';
import styled from 'styled-components';

import CandidateForm from 'components/Forms/Candidate';
import electionShape from 'shapes/election';
import { election as electionMatch } from 'shapes/match';

const Header = styled.h2`
  max-width: 460px;
  margin: 0 auto;
`;

const AddCandidate = ({ match, election }) => (
  <F>
    <Header>New Candidate</Header>
    <CandidateForm match={match} election={election} />
  </F>
);

AddCandidate.propTypes = {
  match: electionMatch.isRequired,
  election: electionShape,
};

export default AddCandidate;
