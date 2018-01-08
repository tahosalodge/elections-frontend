import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from 'components/Table';
import { unitRequest } from 'redux/state/unit';
import { fetchElections } from 'redux/state/election';
import electionSelector from 'selectors/elections';
import LoadingOrContent from 'components/LoadingOrContent';

const columns = [
  {
    Header: 'Season',
    accessor: 'season',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Details',
    accessor: '_id',
    Cell: cell => <Link to={`/election/${cell.value}`}>Details</Link>,
  },
];

class UnitLanding extends React.Component {
  static propTypes = {
    elections: propTypes.arrayOf(propTypes.object).isRequired,
    unit: propTypes.shape().isRequired,
    unitRequest: propTypes.func.isRequired,
    fetchElections: propTypes.func.isRequired,
    loadingElection: propTypes.bool.isRequired,
    loadingUnit: propTypes.bool.isRequired,
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
    const {
      elections, unit, loadingElection, loadingUnit,
    } = this.props;
    return (
      <LoadingOrContent loading={loadingUnit || loadingElection || !unit}>
        <h1>Troop {unit.number}</h1>
        <Link to={`${window.location.pathname}/edit`}>Edit Unit</Link>
        <h2>Elections</h2>
        {elections.length > 0 && <Table columns={columns} data={elections} />}
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
  loadingElection: state.loading.election,
  loadingUnit: state.loading.unit,
});

export default connect(mapStateToProps, { unitRequest, fetchElections })(UnitLanding);
