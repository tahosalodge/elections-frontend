import React, { Fragment as F } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUnits } from 'redux/state/unit';
import toArray from 'selectors/array';
import { arrayOfUnits } from 'shapes/unit';
import userShape from 'shapes/user';
import Table, { ChapterCell } from 'components/Table';
import LoadingOrContent from 'components/LoadingOrContent';

class NoUnitPage extends React.PureComponent {
  static propTypes = {
    fetchUnits: propTypes.func.isRequired,
    units: arrayOfUnits.isRequired,
    user: userShape.isRequired,
    loadingUser: propTypes.bool.isRequired,
    loadingUnit: propTypes.bool.isRequired,
  };

  componentWillMount() {
    this.props.fetchUnits();
  }

  unitMessage = () => (
    <F>
      <h2>Hey there! It looks like you&apos;re not linked to a unit.</h2>
      <p>
        You can <Link to="/units/new">create a new unit</Link>, or if your unit is listed below,
        contact the unit leader for access. <br />
        If you need help, <Link to="/help">let us know</Link>.
      </p>
    </F>
  );

  columns = () => {
    const { user, user: { capability } } = this.props;
    const columns = [
      {
        Header: 'Unit',
        accessor: 'number',
      },
      {
        Header: capability === 'unit' ? 'District' : 'Chapter',
        accessor: 'chapter',
        Cell: ({ value }) => <ChapterCell user={user} value={value} />,
      },
      {
        Header: 'Unit Leader',
        accessor: 'unitLeader',
        Cell: ({ value }) => (
          <span>
            {value.fname} {value.lname}
          </span>
        ),
      },
      // {
      //   Header: 'Actions',
      //   accessor: '_id',
      //   Cell: cell => <button value={cell.value}>Join Unit</button>,
      // },
    ];
    if (capability !== 'unit') {
      columns.push({
        Header: 'Actions',
        accessor: '_id',
        Cell: ({ value }) => <Link to={`/units/${value}`}>View</Link>,
      });
    }
    return columns;
  };

  render() {
    const {
      units, user, loadingUser, loadingUnit,
    } = this.props;

    return (
      <LoadingOrContent loading={loadingUser || loadingUnit}>
        <div>
          {user.capability === 'unit' && this.unitMessage()}
          <Table columns={this.columns()} data={units} />
        </div>
      </LoadingOrContent>
    );
  }
}

const mapStateToProps = (state) => {
  const { user, loading } = state;
  const { user: loadingUser, unit: loadingUnit } = loading;
  return {
    units: toArray(state.unit.items),
    user,
    loadingUnit,
    loadingUser,
  };
};
export default connect(mapStateToProps, { fetchUnits })(NoUnitPage);
