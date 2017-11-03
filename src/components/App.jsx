import 'react-dates/initialize';
import React from 'react';
import propTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import Header from './Header';
import Home from './Home';
import UnitInformation from './Forms/UnitInformation';
import ElectionForm from './Forms/Election';
import Candidate from './Forms/Candidate';
import Nomination from './Forms/Nomination';
import ElectionList from './ElectionList';
import Election from './Election';
import Register from './Forms/Register';
import Login from './Forms/Login';

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <div>
      <Header menu="loggedOut" />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/unit-information" component={UnitInformation} />
        <Route path="/request-election" component={ElectionForm} />
        <Route path="/candidate" component={Candidate} />
        <Route path="/nomination" component={Nomination} />
        <Route path="/election" component={Election} />
        <Route path="/election-list" component={ElectionList} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  </ConnectedRouter>
);

App.propTypes = {
  history: propTypes.object.isRequired, // eslint-disable-line
};

export default App;
