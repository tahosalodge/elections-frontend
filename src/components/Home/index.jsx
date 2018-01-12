import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends React.Component {
  componentWillMount() {}

  render() {
    return (
      <div>
        <h2>Hello! Thank you for participating in unit elections with Tahosa Lodge.</h2>
        <p>
          If your unit held an election in 2017, check your email for an invite, so you can use your
          existing unit information. <br />
          Otherwise, <Link to="/register">click here</Link> to create an account, add your unit, and
          request an election!
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(withRouter(Home));
