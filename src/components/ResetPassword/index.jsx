import React from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { Form, Button } from 'components/Forms/elements';
import { addToast } from 'redux/state/toasts';

class ResetPassword extends React.Component {
  static propTypes = {
    addToast: propTypes.func.isRequired,
  };
  state = {
    email: '',
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { email } = this.state;
      if (email === '') {
        return;
      }
      const { data } = await axios.post('/api/auth/resetPassword', {
        email,
      });
      this.props.addToast(data);
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
            <label>Email</label>
            <input type="email" name="email" onChange={this.handleChange} />
          </div>
          <Button text="Request New Password" />
        </Form>
      </div>
    );
  }
}

export default connect(null, { addToast })(ResetPassword);
