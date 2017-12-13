import 'react-dates/initialize';
import React from 'react';
import propTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Header from './Header';
import Home from './Home';
import UnitInformation from './Forms/UnitInformation';
import Units from './Units';
import UnitLanding from './Units/UnitLanding';
import ElectionForm from './Forms/Election';
import Candidate from './Forms/Candidate';
import Nomination from './Forms/Nomination';
import ElectionList from './ElectionList';
import Election from './Election';
import Register from './Forms/Register';
import Login from './Forms/Login';
import { userVerifyRequest } from '../redux/modules/user';

const Page = styled.div`
  max-width: 1200px;
  width: 90%;
  padding: 2em 5em;
  background: white;
  margin: 0 auto;
  min-height: 60vh;
  margin-top: 2em;
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
              <Route path="/units/:unitId" component={UnitLanding} />
              <Route path="/units/" component={Units} />
              <Route path="/elections/new" component={ElectionForm} />
              <Route path="/candidate" component={Candidate} />
              <Route path="/nomination" component={Nomination} />
              <Route path="/election" component={Election} />
              <Route path="/election-list" component={ElectionList} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
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
