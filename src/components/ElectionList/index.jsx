import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from 'components/Table';
import LoadingOrContent from 'components/LoadingOrContent';
import { electionUnitJoin } from 'selectors/elections';
import { fetchElections } from 'redux/state/election';
import { unitsRequest } from 'redux/state/unit';

const columns = [
  {
    Header: 'Unit',
    accessor: 'unit',
    Cell: ({ value: { number } }) => `Troop ${number}`,
  },
  {
    Header: 'Chapter',
    accessor: 'unit',
    Cell: ({ value: { district } }) => district,
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
];

class ElectionList extends React.Component {
  static propTypes = {
    elections: propTypes.arrayOf(propTypes.shape()).isRequired,
    fetchElections: propTypes.func.isRequired,
    unitsRequest: propTypes.func.isRequired,
    loading: propTypes.shape({
      election: propTypes.bool,
      unit: propTypes.bool,
    }).isRequired,
  };

  componentWillMount() {
    this.props.fetchElections();
    this.props.unitsRequest();
  }

  render() {
    const { elections, loading } = this.props;
    return (
      <LoadingOrContent loading={loading.unit || loading.election}>
        <Table data={elections} columns={columns} />
      </LoadingOrContent>
    );
  }
}

const mapStateToProps = state => ({
  elections: electionUnitJoin(state),
  loading: state.loading,
});

export default connect(mapStateToProps, { fetchElections, unitsRequest })(ElectionList);
