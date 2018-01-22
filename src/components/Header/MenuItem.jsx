import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

const MenuItem = ({ to, text, onClick }) => (
  <li>
    <Link to={`${to}`} onClick={onClick}>
      {text}
    </Link>
  </li>
);

MenuItem.propTypes = {
  to: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
};

export default MenuItem;
