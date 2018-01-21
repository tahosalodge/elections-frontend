import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogoutRequest } from 'redux/state/user';
import LoadingOrContent from 'components/LoadingOrContent';

class Logout extends React.Component {
  static propTypes = {
    userLogoutRequest: propTypes.func.isRequired,
  };
  componentWillMount() {
    this.props.userLogoutRequest();
  }

  render() {
    return <LoadingOrContent loading />;
  }
}

export default connect(null, { userLogoutRequest })(Logout);
