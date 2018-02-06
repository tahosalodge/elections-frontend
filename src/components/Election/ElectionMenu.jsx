import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { colors } from 'constants/values';
import electionShape from 'shapes/election';

const MenuStyles = styled.div`
  min-height: 55px;
  margin-bottom: 1em;

  ul {
    width: 100%;
    background: ${colors.mutedRed};
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-flow: row wrap;
    position: absolute;
    left: 0;

    @media (max-width: 600px) {
      position: relative;
    }
  }

  li {
    padding: 1em;
    text-align: center;
  }

  a {
    text-decoration: none;
    color: white;
  }
`;
const ElectionMenu = ({ election: { _id, unitId } }) => (
  <MenuStyles>
    <ul>
      <li>
        <NavLink to={`/elections/${_id}`}>Overview</NavLink>
      </li>
      <li>
        <NavLink to={`/units/${unitId}/edit`}>Edit Unit</NavLink>
      </li>
      <li>
        <NavLink to={`/elections/${_id}/candidate`}>Add Candidate</NavLink>
      </li>
      {/* <li>
        <NavLink to={`/elections/${_id}/nomination`}>Add Nomination</NavLink>
      </li> */}
      {/* <li>
        <NavLink to={`/elections/${_id}/team`}>Election Team</NavLink>
      </li>
      <li>
        <NavLink to={`/elections/${_id}/report`}>Election Report</NavLink>
      </li>
      <li>
        <NavLink to={`/elections/${_id}/ballots`}>Print Ballots</NavLink>
      </li> */}
    </ul>
  </MenuStyles>
);

ElectionMenu.propTypes = {
  election: electionShape,
};

export default ElectionMenu;
