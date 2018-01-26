import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from 'components/Table';
import { unitRequest } from 'redux/state/unit';
import { fetchElections } from 'redux/state/election';
import { electionsByUnit } from 'selectors/elections';
import { chapters } from 'constants/values';
import LoadingOrContent from 'components/LoadingOrContent';

class Unit extends React.Component {
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
    if (this.props.match.params) {
      const { params } = this.props.match;
      this.props.unitRequest(params.unitId);
    }
    this.props.fetchElections();
  }

  columns = () => [
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
      Cell: ({ value }) => <Link to={`/elections/${value}`}>Details</Link>,
    },
  ];

  render() {
    const {
      elections, unit, loadingElection, loadingUnit,
    } = this.props;
    const selectedChapter = chapters.find(chapter => chapter.value === unit.chapter);

    return (
      <LoadingOrContent loading={loadingUnit || loadingElection || !unit}>
        <h1>Troop {unit.number}</h1>
        {selectedChapter && (
          <h2>
            {selectedChapter.district} District | {selectedChapter.chapter}
          </h2>
        )}
        <Link to={`${window.location.pathname}/edit`}>Edit Unit Information</Link>
        <h2>Elections</h2>
        {elections.length > 0 && <Table columns={this.columns()} data={elections} />}
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
  elections: electionsByUnit(state, props),
  unit: state.unit.items[props.match.params.unitId] || {},
  loadingElection: state.loading.election,
  loadingUnit: state.loading.unit,
});

export default connect(mapStateToProps, { unitRequest, fetchElections })(Unit);
