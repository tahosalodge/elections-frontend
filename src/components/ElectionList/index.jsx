import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Table, { ChapterCell } from 'components/Table';
import LoadingOrContent from 'components/LoadingOrContent';
import { electionUnitJoin } from 'selectors/elections';
import { fetchElections } from 'redux/state/election';
import { unitsRequest } from 'redux/state/unit';

class ElectionList extends React.Component {
  static propTypes = {
    elections: propTypes.arrayOf(propTypes.shape()).isRequired,
    fetchElections: propTypes.func.isRequired,
    unitsRequest: propTypes.func.isRequired,
    loading: propTypes.shape({
      election: propTypes.bool,
      unit: propTypes.bool,
    }).isRequired,
    user: propTypes.shape({
      capability: propTypes.string,
    }).isRequired,
  };

  componentWillMount() {
    this.props.fetchElections();
    this.props.unitsRequest();
  }

  render() {
    const { elections, loading, user } = this.props;
    const columns = [
      {
        Header: 'Unit',
        accessor: 'unit',
        Cell: ({ value: { number } }) => `Troop ${number}`,
      },
      {
        Header: 'Chapter',
        accessor: 'unit',
        Cell: ({ value: { chapter } }) => <ChapterCell user={user} value={chapter} />,
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
    ];
    return (
      <LoadingOrContent loading={loading.unit || loading.election}>
        <Table data={elections} columns={columns} />
      </LoadingOrContent>
    );
  }
}

const mapStateToProps = state => ({
  elections: electionUnitJoin(state),
  user: state.user,
  loading: state.loading,
});

export default connect(mapStateToProps, { fetchElections, unitsRequest })(ElectionList);
