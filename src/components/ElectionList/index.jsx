import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Table, { ChapterCell } from 'components/Table';
import LoadingOrContent from 'components/LoadingOrContent';
import { electionUnitJoin } from 'selectors/elections';
import { arrayOfElections } from 'shapes/election';
import userShape from 'shapes/user';
import loadingShape from 'shapes/loading';
import { fetchElections } from 'redux/state/election';
import { fetchUnits } from 'redux/state/unit';

class ElectionList extends React.Component {
  static propTypes = {
    elections: arrayOfElections.isRequired,
    fetchElections: propTypes.func.isRequired,
    fetchUnits: propTypes.func.isRequired,
    loading: loadingShape.isRequired,
    user: userShape.isRequired,
  };

  componentWillMount() {
    this.props.fetchElections();
    this.props.fetchUnits();
  }

  columns = () => {
    const { user } = this.props;
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
      {
        Header: 'Actions',
        accessor: '_id',
        Cell: ({ value }) => (
          <span>
            <Link to={`/elections/${value}`}>View</Link>
            <span> | </span>
            <Link to={`/elections/${value}/edit`}>Schedule</Link>
          </span>
        ),
      },
    ];
    return columns;
  };

  render() {
    const { elections, loading } = this.props;
    return (
      <LoadingOrContent loading={loading.unit || loading.election}>
        <Table data={elections} columns={this.columns()} />
      </LoadingOrContent>
    );
  }
}

const mapStateToProps = state => ({
  elections: electionUnitJoin(state),
  user: state.user,
  loading: state.loading,
});

export default connect(mapStateToProps, { fetchElections, fetchUnits })(ElectionList);
