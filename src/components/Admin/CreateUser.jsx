import React from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { Form, Button } from 'components/Forms/elements';
import { addToast } from 'redux/state/toasts';
import { chapters } from 'constants/values';

class CreateUser extends React.Component {
  static propTypes = {
    addToast: propTypes.func.isRequired,
  };
  state = {
    fname: '',
    lname: '',
    email: '',
    capability: '',
    chapter: '',
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('electionToken');
    try {
      const {
        fname, lname, email, capability, chapter,
      } = this.state;
      const response = await axios.post(
        '/api/admin/create-user',
        {
          fname,
          lname,
          email,
          capability,
          chapter,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      this.props.addToast(`User ${response.data.email} added successfully.`);
    } catch (error) {
      const { data, status } = error.response;
      this.props.addToast(`${status}: ${data}`);
    }
  };

  handleChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <div>
            <label>First Name</label>
            <input type="text" name="fname" onChange={this.handleChange} />
          </div>
          <div>
            <label>Last Name</label>
            <input type="text" name="lname" onChange={this.handleChange} />
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" onChange={this.handleChange} />
          </div>
          <div>
            <label>Capability</label>
            <select name="capability" onChange={this.handleChange}>
              <option value="unit">Unit</option>
              <option value="chapter">Chapter</option>
              <option value="lodge">Lodge</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label>Chapter</label>
            <select name="chapter" onChange={this.handleChange}>
              <option>---</option>
              {chapters.map(option => (
                <option key={`option-${option.value}`} value={option.value}>
                  {option.chapter}
                </option>
              ))}
            </select>
          </div>
          <Button text="Create User" />
        </Form>
      </div>
    );
  }
}

export default connect(null, { addToast })(CreateUser);
