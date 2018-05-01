import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { colors } from 'constants/values';

const MenuStyles = styled.div`
  min-height: 125px;
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
const AdminMenu = () => (
  <MenuStyles>
    <ul>
      <li>
        <NavLink to="/admin/import">Import Candidates</NavLink>
      </li>
      <li>
        <NavLink to="/admin/create-user">Create User</NavLink>
      </li>
      <li>
        <NavLink to="/admin/users">User List</NavLink>
      </li>
      <li>
        <NavLink to="/admin/nomination-approval">Nomination Approval</NavLink>
      </li>
      <li>
        <NavLink to="/admin/export-candidates">Export Candidates</NavLink>
      </li>
      <li>
        <NavLink to="/admin/export-nominations">Export Nominations</NavLink>
      </li>
    </ul>
  </MenuStyles>
);

export default AdminMenu;
