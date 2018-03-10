import React, { Fragment as F } from 'react';
import styled from 'styled-components';

import NominationForm from 'components/Forms/Nomination';
import electionShape from 'shapes/election';
import { election as electionMatch } from 'shapes/match';

const Header = styled.h2`
  max-width: 460px;
  margin: 0 auto;
`;

const AddNomination = ({ match, election }) => (
  <F>
    <Header>New Nomination</Header>
    <NominationForm match={match} election={election} />
  </F>
);

AddNomination.propTypes = {
  match: electionMatch.isRequired,
  election: electionShape,
};

export default AddNomination;
