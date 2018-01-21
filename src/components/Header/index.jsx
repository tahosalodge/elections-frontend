import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MenuItem from './MenuItem';

const StyledHeader = styled.header`
  background: #cf3a43;
  padding: 1em;
  display: flex;
  justify-content: space-between;

  h1 {
    margin: 0;

    a {
      color: white;
      text-decoration: none;
    }
  }

  ul {
    display: flex;
    list-style: none;

    a {
      color: white;
      text-decoration: none;
      margin-right: 1.5em;
    }
  }
`;

const MenuItems = {
  unit: [
    {
      to: '/units',
      text: 'My Unit',
    },
  ],
  chapter: [
    {
      to: '/units',
      text: 'Units',
    },
    {
      to: '/election-list',
      text: 'Election List',
    },
    {
      to: '/elections/schedule',
      text: 'Schedule Elections',
    },
  ],
  loggedOut: [
    {
      to: '/register',
      text: 'Register',
    },
    {
      to: '/login',
      text: 'Login',
    },
  ],
};

const Header = ({ menu }) => (
  <StyledHeader>
    <h1>
      <Link to="/">Tahosa Lodge Elections</Link>
    </h1>

    <ul>
      {MenuItems[menu].map(item => (
        <MenuItem key={`menuItem${item.to}`} to={item.to} text={item.text} />
      ))}
      {menu !== 'loggedOut' && <MenuItem to="/logout" text="Log Out" />}
    </ul>
  </StyledHeader>
);

Header.propTypes = {
  menu: propTypes.string.isRequired,
};

export default Header;
