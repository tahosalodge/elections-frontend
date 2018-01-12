import React from 'react';
import propTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { unitsRequest } from 'redux/state/unit';
import Table from 'components/Table';

class NoUnitPage extends React.PureComponent {
  static propTypes = {
    unitsRequest: propTypes.func.isRequired,
    units: propTypes.arrayOf(propTypes.object).isRequired,
    user: propTypes.shape().isRequired,
    history: propTypes.shape({
      push: propTypes.func,
    }).isRequired,
  };

  componentWillMount() {
    const { user, history: { push } } = this.props;
    if (user.unit) {
      push(`/units/${user.unit}`);
    }
    this.props.unitsRequest();
  }

  render() {
    const columns = [
      {
        Header: 'Unit',
        accessor: 'number',
      },
      {
        Header: 'District',
        accessor: 'district',
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

    const { units } = this.props;

    return (
      <div>
        <h2>Hey there! It looks like you&apos;re not linked to a unit.</h2>
        <p>
          You can <Link to="/units/new">create a new unit</Link>, or if your unit is listed below,
          contact the unit leader for access. <br />
          If you need help, <Link to="/help">let us know</Link>.
        </p>
        <Table columns={columns} data={units} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  units: state.unit.items || {},
  user: state.user,
});
export default connect(mapStateToProps, { unitsRequest })(withRouter(NoUnitPage));
