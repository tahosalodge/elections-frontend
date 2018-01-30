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
  align-items: center;
  flex-flow: row wrap;

  h1 {
    margin: 0;

    @media (max-width: 600px) {
      font-size: 5vw;
    }

    a {
      color: white;
      text-decoration: none;
    }
  }

  ul {
    display: flex;
    list-style: none;
    flex-flow: row wrap;
    padding: 0;
    margin: 0;

    @media (max-width: 600px) {
      width: 100%;
      display: ${props => (props.showMenu ? 'block' : 'none')};
    }

    a {
      color: white;
      text-decoration: none;
      margin-right: 1.5em;
    }
  }

  li {
    @media (max-width: 600px) {
      width: 100%;
      padding: 1em;
      border-top: 1px solid white;

      &:first-child {
        border-top: 0;
      }
    }
  }

  button {
    background: white;
    color: black;
    border: 0;
    width: auto;
    padding: 0.5em 1em;
    display: none;

    @media (max-width: 600px) {
      display: block;
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
  ],
  admin: [
    {
      to: '/units',
      text: 'Units',
    },
    {
      to: '/election-list',
      text: 'Election List',
    },
    {
      to: '/admin/import',
      text: 'Import Unit',
    },
    {
      to: '/admin/create-user',
      text: 'Create User',
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

class Header extends React.Component {
  static propTypes = {
    menu: propTypes.string.isRequired,
  };

  state = { mobileMenuToggle: false };

  toggleMobileMenu = () => {
    this.setState({ mobileMenuToggle: !this.state.mobileMenuToggle });
  };

  hideMobileMenu = () => {
    this.setState({ mobileMenuToggle: false });
  };

  render() {
    const { menu } = this.props;
    const { mobileMenuToggle } = this.state;
    return (
      <StyledHeader showMenu={mobileMenuToggle}>
        <h1>
          <Link to="/">Tahosa Lodge Elections</Link>
        </h1>

        <button onClick={this.toggleMobileMenu}>Menu</button>

        <ul>
          {MenuItems[menu].map(item => (
            <MenuItem
              key={`menuItem${item.to}`}
              to={item.to}
              text={item.text}
              onClick={this.hideMobileMenu}
            />
          ))}
          {menu !== 'loggedOut' && <MenuItem to="/logout" text="Log Out" />}
        </ul>
      </StyledHeader>
    );
  }
}

export default Header;
