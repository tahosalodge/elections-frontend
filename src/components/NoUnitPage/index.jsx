import React from 'react';
import propTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { unitsRequest } from 'redux/state/unit';
import arraySelector from 'selectors/array';
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
    const { user, history } = this.props;
    if (user.unit) {
      history.push(`/units/${user.unit}`);
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
        Header: 'Actions',
        accessor: '_id',
        Cell: cell => <button value={cell.value}>Join Unit</button>,
      },
    ];

    const { units } = this.props;

    return (
      <div>
        <h2>Hey there! It looks like you&apos;re not linked to a unit.</h2>
        <p>
          Please select a unit from below, otherwise you can{' '}
          <Link to="/units/new">create a new unit</Link>.
        </p>
        <Table columns={columns} data={units} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  units: arraySelector(state.unit.items),
  user: state.user,
});
export default connect(mapStateToProps, { unitsRequest })(withRouter(NoUnitPage));
