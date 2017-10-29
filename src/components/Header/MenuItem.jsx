import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

const MenuItem = ({ to, text }) => (
  <li>
    <Link to={`${to}`}>{text}</Link>
  </li>
);

MenuItem.propTypes = {
  to: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
};

export default MenuItem;
