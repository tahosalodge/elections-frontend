import React from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { addToast } from 'redux/state/toasts';

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
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Unit Id</label>
          <br />
          <br />
          <input type="text" name="unitId" onChange={this.handleChange} />
          <br />
          <br />
          <button type="submit">Submit</button>
          <pre>{JSON.stringify(this.state.unitData, null, 2)}</pre>
        </form>
      </div>
    );
  }
}

export default connect(null, { addToast })(UnitImport);
