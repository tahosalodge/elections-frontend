import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addToast } from 'redux/state/toasts';

class UnitImport extends React.Component {
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
    } catch (e) {
      this.props.addToast(`There was an error importing ${this.state.unitId}.`);
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
        </form>
      </div>
    );
  }
}

export default connect(null, { addToast })(UnitImport);
