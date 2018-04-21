import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from 'constants/values';

const Button = styled.button`
  background: ${colors.red};
  border: 0;
  color: white;
  font-size: 14px;
  padding: 0.2em 0.4em;
  margin: 0 0.5em;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const NominationActions = ({ nominationId, updateNomination }) => (
  <React.Fragment>
    <Button onClick={() => updateNomination(nominationId, 'Approved')}>
      Approve
    </Button>
    <Button
      onClick={() => updateNomination(nominationId, 'Registration Issue')}
    >
      Registration Issue
    </Button>
    <Button onClick={() => updateNomination(nominationId, 'Council Issue')}>
      Council Issue
    </Button>
  </React.Fragment>
);

NominationActions.propTypes = {
  nominationId: propTypes.string.isRequired,
  updateNomination: propTypes.func.isRequired,
};

export default NominationActions;
