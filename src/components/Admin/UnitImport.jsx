import React from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { addToast } from 'redux/state/toasts';
import { Form, Button } from 'components/Forms/elements';

class UnitImport extends React.Component {
  static propTypes = {
    addToast: propTypes.func.isRequired,
  };
  state = {
    unitData: {},
    unitId: '',
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('electionToken');
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/import-unit/${this.state.unitId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      this.props.addToast(`Unit ${this.state.unitId} added successfully.`);
      this.setState({ unitData: response.data });
    } catch (error) {
      console.log(error);
      const { data, status } = error.response;
      this.props.addToast(`${status}: ${data}`);
    }
  };

  handleChange = (event) => {
    this.setState({ unitId: event.target.value });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <div>
          <label>Unit Id</label>
          <input type="text" name="unitId" onChange={this.handleChange} />
        </div>
        <Button />
        <pre>{JSON.stringify(this.state.unitData, null, 2)}</pre>
      </Form>
    );
  }
}

export default connect(null, { addToast })(UnitImport);
