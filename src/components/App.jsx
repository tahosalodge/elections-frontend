import 'react-dates/initialize';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import UnitInformation from './Forms/UnitInformation';
import ElectionForm from './Forms/Election';
import Candidate from './Forms/Candidate';
import Nomination from './Forms/Nomination';
import ElectionList from './ElectionList';
import Election from './Election';

// eslint-disable-next-line
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/unit-information" component={UnitInformation} />
            <Route path="/request-election" component={ElectionForm} />
            <Route path="/candidate" component={Candidate} />
            <Route path="/nomination" component={Nomination} />
            <Route path="/election" component={Election} />
            <Route path="/election-list" component={ElectionList} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
