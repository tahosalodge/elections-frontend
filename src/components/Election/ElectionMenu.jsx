import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { colors } from 'constants/values';
import electionShape from 'shapes/election';

const MenuStyles = styled.div`
  min-height: 55px;

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
    justify-content: space-between;

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
        <NavLink to={`/units/${unitId}`}>Edit Unit</NavLink>
      </li>
      <li>
        <NavLink to={`/elections/${_id}/candidates`}>Candidates</NavLink>
      </li>
      <li>
        <NavLink to={`/elections/${_id}/nominations`}>Adult Nominations</NavLink>
      </li>
      <li>
        <NavLink to={`/elections/${_id}/team`}>Election Team</NavLink>
      </li>
      <li>
        <NavLink to={`/elections/${_id}/report`}>Election Report</NavLink>
      </li>
      <li>
        <NavLink to={`/elections/${_id}/ballots`}>Print Ballots</NavLink>
      </li>
    </ul>
  </MenuStyles>
);

ElectionMenu.propTypes = {
  election: electionShape,
};

export default ElectionMenu;
