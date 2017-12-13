import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from '../Table';
import { unitRequest } from '../../redux/modules/unit';
import { electionsRequest } from '../../redux/modules/election';
import electionSelector from '../../selectors/elections';
import LoadingOrContent from '../LoadingOrContent';

const headers = [
  {
    title: 'Date',
    field: 'date',
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
    electionsRequest: propTypes.func.isRequired,
    loading: propTypes.shape({
      election: propTypes.bool,
      unit: propTypes.bool,
    }).isRequired,
  };

  componentWillMount() {
    this.props.unitRequest(this.props.match.params.unitId);
    this.props.electionsRequest();
  }

  render() {
    const { elections, unit, loading } = this.props;
    return (
      <LoadingOrContent loading={!loading.unit || !loading.election || !unit}>
        <h1>Troop {unit.number}</h1>
        <Link to={`${window.location.pathname}/edit`}>Edit Unit</Link>
        <h2>Elections</h2>
        <Table headers={headers} data={elections} />
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

export default connect(mapStateToProps, { unitRequest, electionsRequest })(UnitLanding);
