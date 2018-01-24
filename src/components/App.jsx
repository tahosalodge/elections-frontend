import 'react-dates/initialize';
import React from 'react';
import propTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Header from 'components/Header';
import Home from 'components/Home';
import UnitInformation from 'components/Forms/UnitInformation';
import Unit from 'components/Unit';
import UnitList from 'components/UnitList';
import ElectionForm from 'components/Forms/Election';
import Candidate from 'components/Forms/Candidate';
import Nomination from 'components/Forms/Nomination';
import ElectionList from 'components/ElectionList';
import Election from 'components/Election';
import Register from 'components/Forms/Register';
import Login from 'components/Forms/Login';
import Help from 'components/Help';
import Logout from 'components/Logout';
import { userVerifyRequest } from 'redux/state/user';

const Page = styled.div`
  max-width: 1200px;
  width: 90%;
  padding: 2em 5em;
  background: white;
  margin: 2em auto 0;
  min-height: 60vh;

  @media (max-width: 600px) {
    width: 100%;
    padding: 1em;
    margin-top: 0;
  }
`;

class App extends React.PureComponent {
  static propTypes = {
    history: propTypes.shape().isRequired,
    capability: propTypes.string.isRequired,
    userVerifyRequest: propTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.userVerifyRequest();
  }
  render() {
    const { history, capability } = this.props;
    return (
      <ConnectedRouter history={history}>
        <div>
          <Header menu={capability} />
          <Page>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/units/new" component={UnitInformation} />
              <Route path="/units/:unitId/edit" component={UnitInformation} />
              <Route path="/units/:unitId" component={Unit} />
              <Route path="/units/" component={UnitList} />
              <Route path="/elections/new" component={ElectionForm} />
              <Route path="/candidate" component={Candidate} />
              <Route path="/nomination" component={Nomination} />
              <Route path="/elections/:electionId/edit" component={ElectionForm} />
              <Route path="/elections/:electionId" component={Election} />
              <Route path="/election-list" component={ElectionList} />
              <Route path="/register/:type" component={Register} />
              <Route path="/register/" component={Register} />
              <Route path="/help" component={Help} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
            </Switch>
          </Page>
        </div>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = state => ({
  capability: state.user.capability,
});

export default connect(mapStateToProps, { userVerifyRequest })(App);
