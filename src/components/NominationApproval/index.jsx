import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { arrayOfNominations } from 'shapes/nomination';
import { updateNomination, fetchNominations } from 'redux/state/nomination';
import Table from 'components/Table';
import NominationActions from './NominationActions';

class NominationsApproval extends React.PureComponent {
  static propTypes = {
    nominations: arrayOfNominations.isRequired,
    fetchNominations: propTypes.func.isRequired,
    updateNomination: propTypes.func.isRequired,
  };

  componentDidMount = () => {
    this.props.fetchNominations();
  };

  updateNomination = (nominationId, status) => {
    this.props.updateNomination(nominationId, { status });
  };

  columns = () => [
    {
      Header: 'First Name',
      accessor: 'fname',
    },
    {
      Header: 'Last Name',
      accessor: 'lname',
    },
    {
      Header: 'BSA ID',
      accessor: 'bsaid',
    },
    {
      Header: 'Status',
      accessor: 'status',
      minWidth: 150,
    },
    {
      Header: 'Actions',
      accessor: '_id',
      minWidth: 300,
      Cell: ({ value }) => (
        <NominationActions
          nominationId={value}
          updateNomination={this.updateNomination}
        />
      ),
    },
  ];

  render() {
    const { nominations } = this.props;
    return (
      <React.Fragment>
        <Table
          columns={this.columns()}
          data={nominations}
          notFoundMessage="No nominations entered."
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ nomination: { items } }) => ({
  nominations: Object.values(items),
});

export default connect(mapStateToProps, { updateNomination, fetchNominations })(
  NominationsApproval
);
