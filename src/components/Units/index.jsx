import React from 'react';
import propTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { unitsRequest } from '../../redux/modules/unit';
import Table from '../Table';

class Unit extends React.PureComponent {
  static propTypes = {
    unitsRequest: propTypes.func.isRequired,
    units: propTypes.arrayOf(propTypes.object).isRequired,
    user: propTypes.shape().isRequired,
    history: propTypes.shape({
      push: propTypes.func,
    }).isRequired,
  };

  componentWillMount() {
    if (this.props.user.unit) {
      this.props.history.push(`/units/${this.props.user.unit}`);
    }
    this.props.unitsRequest();
  }

  render() {
    const headers = [
      {
        title: 'Unit',
        field: 'number',
      },
      {
        title: 'District',
        field: 'district',
      },
      {
        title: 'Actions',
        field: 'actions',
        component: <button>Join Unit</button>,
      },
    ];

    return (
      <div>
        <h2>Hey there! It looks like you're not linked to a unit.</h2>
        <p>
          Please select a unit from below, otherwise you can{' '}
          <Link to="/units/new">create a new unit</Link>.
        </p>
        <Table headers={headers} data={this.props.units} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  units: state.unit.units,
  user: state.user,
});
export default connect(mapStateToProps, { unitsRequest })(withRouter(Unit));
