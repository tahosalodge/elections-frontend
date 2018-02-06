import React, { Fragment as F } from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

import CandidateForm from 'components/Forms/Candidate';
import electionShape from 'shapes/election';

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
  match: propTypes.shape({
    params: propTypes.shape({
      electionId: propTypes.string,
    }),
  }).isRequired,
  election: electionShape,
};

export default AddCandidate;
