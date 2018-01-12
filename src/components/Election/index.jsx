import React from 'react';
import propTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchElections } from 'redux/state/election';
import LoadingOrContent from 'components/LoadingOrContent';
// import Table from 'components/Table';
import ElectionMenu from './ElectionMenu';

// const columns = [
//   {
//     Header: 'Candidate',
//     accessor: 'candidate',
//   },
//   {
//     Header: 'Status',
//     accessor: 'status',
//   },
// ];

class Election extends React.Component {
  static propTypes = {
    fetchElections: propTypes.func.isRequired,
    election: propTypes.shape().isRequired,
    unit: propTypes.shape().isRequired,
    loading: propTypes.bool.isRequired,
  };

  componentWillMount() {
    this.props.fetchElections();
  }

  render() {
    const { election, unit, loading } = this.props;
    return (
      <LoadingOrContent loading={loading}>
        <h1>
          {election.season} - Troop {unit.number}
        </h1>
        <ElectionMenu />
        <p>
          <strong>Election Status: {election.status}</strong>
        </p>
        <p>Adding candidates and nominations coming soon!</p>
        {/* <h2>Candidates</h2> */}
        {/* <Table columns={columns} data={data} /> */}
        {/* <Link to="/">Add Candidate</Link> */}
        {/* <h2>Nominations</h2> */}
        {/* <Table columns={columns} data={data} /> */}
      </LoadingOrContent>
    );
  }
}

const mapStateToProps = (state, props) => ({
  election: state.election.items[props.match.params.electionId] || {},
  unit: state.unit.items[state.user.unit] || {},
  loading: state.loading.election,
});

export default connect(mapStateToProps, { fetchElections })(Election);
