import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
const Header = () => (
  <StyledHeader>
    <h1>
      <Link to="/">Tahosa Lodge Elections</Link>
    </h1>

    <ul>
      <li>
        <Link to="/unit-information">Unit Information</Link>
      </li>
      <li>
        <Link to="/request-election">Calendar</Link>
      </li>
      <li>
        <Link to="/request-election">Election List</Link>
      </li>
      <li>
        <Link to="/request-election">Join Election Team</Link>
      </li>
    </ul>
  </StyledHeader>
);

export default Header;
