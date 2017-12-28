import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { unitRequest } from 'redux/state/unit';
import { fetchElections } from 'redux/state/election';
import electionSelector from 'selectors/elections';
import LoadingOrContent from 'components/LoadingOrContent';
import Table from '../Table';

const headers = [
  {
    title: 'Season',
    field: 'season',
  },
  {
    title: 'Status',
    field: 'status',
  },
];

class UnitLanding extends React.Component {
  static propTypes = {
    elections: propTypes.arrayOf(propTypes.object).isRequired,
    unit: propTypes.shape().isRequired,
    unitRequest: propTypes.func.isRequired,
    fetchElections: propTypes.func.isRequired,
    loading: propTypes.shape({
      election: propTypes.bool,
      unit: propTypes.bool,
    }).isRequired,
    match: propTypes.shape({
      params: propTypes.shape({
        unitId: propTypes.string,
      }),
    }).isRequired,
  };

  componentWillMount() {
    this.props.unitRequest(this.props.match.params.unitId);
    this.props.fetchElections();
  }

  render() {
    const { elections, unit, loading } = this.props;
    return (
      <LoadingOrContent loading={!loading.unit || !loading.election || !unit}>
        <h1>Troop {unit.number}</h1>
        <Link to={`${window.location.pathname}/edit`}>Edit Unit</Link>
        <h2>Elections</h2>
        {elections.length > 0 && <Table headers={headers} data={elections} />}
        {elections.length <= 0 && <p>No elections found.</p>}
        <Link to="/elections/new">Request Election</Link>

        {/* <h2>Leaders</h2>
        <Table headers={headers} data={data} />
        <button>Add Leader</button> */}
      </LoadingOrContent>
    );
  }
}

const mapStateToProps = (state, props) => ({
  elections: electionSelector(state, props),
  unit: state.unit.items[props.match.params.unitId] || {},
  loading: {
    election: state.election.successful,
    unit: state.unit.successful,
  },
});

export default connect(mapStateToProps, { unitRequest, fetchElections })(UnitLanding);
