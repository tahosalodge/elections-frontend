import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'components/Table';
import apiRequest from 'redux/helpers/api';

class UserList extends React.Component {
  state = {
    users: [],
  };

  async componentDidMount() {
    try {
      apiRequest('/auth/users').then(users => this.setState({ users }));
    } catch (error) {
      const { data, status } = error.response;
      console.error(`${status}: ${data}`);
    }
  }

  resetPassword = async email => {
    await axios.post('/api/auth/resetPassword', {
      email,
    });
  };

  columns = () => [
    {
      Header: 'First Name',
      accessor: 'fname',
      maxWidth: 150,
    },
    {
      Header: 'Last Name',
      accessor: 'lname',
      maxWidth: 150,
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Capability',
      accessor: 'capability',
      maxWidth: 100,
    },
    {
      Header: 'Unit',
      accessor: 'unit',
      Cell: ({ value }) => value && <Link to={`/units/${value}`}>Details</Link>,
    },
    {
      Header: 'Reset Password',
      accessor: 'email',
      Cell: ({ value }) => (
        <button onClick={() => this.resetPassword(value)}>
          Reset Password
        </button>
      ),
    },
  ];

  render() {
    return (
      <div>{<Table columns={this.columns()} data={this.state.users} />}</div>
    );
  }
}

export default UserList;
